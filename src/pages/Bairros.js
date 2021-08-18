import React ,{ useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image,SafeAreaView, TextInput, Alert, Modal, FlatList} from 'react-native';
import 'react-native-gesture-handler';
import {IconButton} from 'react-native-paper';
import StatusBarColor from '../components/StatusBarColor';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { List } from 'react-native-paper';
import api from '../services/API'
import Icon from 'react-native-vector-icons/MaterialIcons';
import storage from '../services/Storage'


export default function Bairros ({navigation, route}) {
    const [data, setData] = useState({})
    const [data2, setData2] = useState({})
    const [modalVisible, setModalVisible] = useState(false)
    const [token, setToken] = useState()
    const {bairro} = route.params
    const {cidade} = route.params
    async function reload(id){
      const token = await storage.getData('@storage_sessao');
      const response = await api.get(`/cameras/camerasbairro/${id}/${token}`)
      const dados = response.data
      setData(dados[0])
    }
    useEffect(() => {
      async function init(){
          setModalVisible(false)
          const token = await storage.getData('@storage_sessao');
          const cod = await storage.getData('@storage_cod');
          setToken(token);
          await api.post(`/autenticacao/registraatividade/clinicam/${cod}`)
          const response2 = await api.get(`/cameras/bairros/${cidade}/${token}`)
          await reload(bairro)
          const dados2 = response2.data
          setData2(dados2[0])
      }
      init()
  }, []);
  
  const renderItem = ({ item }) => (
    <View style={styles.list}>
        <List.Item
            title={item.cam_titulo}
            description={item.end_nome}
            style={styles.itemList}
            titleStyle={styles.itemTitle}
            descriptionStyle={styles.itemDescription}
            left={props =><Image style={styles.imglist} 
            source={{uri: item.cam_poster}}/>}
            right={props =><TouchableOpacity style={styles.btncenter}> 
                <Icon.Button name="videocam" style={styles.btnlist}
                onPress={() => navigation.navigate('Views', {cod_cam: item.cam_codigo, url:item.cam_url})}> Visualizar</Icon.Button> 
            </TouchableOpacity>}
        />
    </View>
  ); 
  const renderItem2 = ({ item }) => (
    <View  style={styles.space}>
      <TouchableOpacity style={styles.botaosBairros} 
      onPress={() => reload(item.bai_codigo)}>
          
          <MaterialCommunityIcons style={styles.iconcam} name="video" color="white" size={20} /> 
          <Text style={styles.text}>   {item.bai_nome} </Text> 
      
      </TouchableOpacity>
  
    </View>
    
  ); 
      return(
          <SafeAreaView style={styles.container}>
              <StatusBarColor backgroundColor='rgb(45,77,118)' barStyle='light-content'/>
              <View style={styles.nav}>
                  <Image style={styles.logo} source={require('../img/Logo2.png')}/>     
                  <IconButton 
                  icon="account-circle" color="white" style={styles.iconuser} onPress={async() =>{
                    const logout = await api.put("/autenticacao/encerrasessao/clinicam/"+token)
                    console.log('Logout '+logout.data)
                    navigation.navigate('Login')
                  }
                  } 
                  />       
              </View>        
              <View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    }}
                >
                    <View style={styles.centeredView}>
                      <View style={styles.modalView}>
                        <View style={styles.list}>
                            <FlatList
                                data={data2}
                                renderItem={renderItem2}
                                keyExtractor={item => item.bai_codigo}
                            />
                        </View>
                        <View style={styles.botaofecharmodal}>
                          <TouchableOpacity
                            style={{ ...styles.openButton, backgroundColor: "#fc852e" }}
                            onPress={() => {
                                setModalVisible(!modalVisible);
                            }}
                            >
                            <Text style={styles.textStyle}> Fechar </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                </Modal>  
                <View>
                   <TouchableOpacity
                    style={styles.botaos}
                    onPress={() => {
                      setModalVisible(true);
                    }}
                  >
                    <Text style={styles.textStyle}>Filtrar por Bairro</Text>
                  </TouchableOpacity>
                </View>
                 
                <View style={styles.list}>
                  <FlatList
                      data={data}
                      renderItem={renderItem}
                      keyExtractor={item => item.cam_codigo}
                  />
                </View>
              </View>
          </SafeAreaView>
      );
    }
  
    const styles = StyleSheet.create({
      container: {
        flex: 1,
      },
      backgroud:{
          width:'100%',
          height:'100%',
      },
      logo:{
          width:250,
          height:100,
          resizeMode:'contain',
          marginBottom:20,
        },
      logocenter:{
        alignItems:'center',
      },
      botaosBairros:{
        backgroundColor:'rgb(45,77,118)',
        borderRadius: 15,
        width:'90%',
        height:50,
        resizeMode:'contain', 
        alignItems:'center',
        justifyContent:'flex-start',
        marginLeft:20,
        flexDirection:"row",
      },
      text:{
        color:'white',
        fontSize:16,
        marginLeft:40,
      },
      iconcam:{
        marginLeft:20,
      },
      space:{
        marginTop:20,
        justifyContent:'center',
      },
      botaos:{
      backgroundColor:'rgb(45,77,118)',
      width:'100%',
      marginTop:1,
      height:40,
      resizeMode:'contain',
      alignItems:'center',
      justifyContent:'center',
      flexDirection:"row",
    },
    text:{
      color:'white',
      fontSize:16,
    },
    nav:{
      alignItems:'center',
      justifyContent: 'center',
      backgroundColor:'rgb(45,77,118)',
      width: '100%',
      height:'8%' ,
  },
  logo:{
      width:150,
      height:100,
      resizeMode:'contain',
  },
  viewSearch:{
      marginTop: 0,
      backgroundColor:'#FFF',
      elevation:2.5,
      borderRadius:0,
      marginVertical: 10,
      width: '100%',
      flexDirection: 'row',
      alignSelf:'center'
    },
    input:{
      width:'90%',
      padding:8,
      paddingLeft:20,
      fontSize:15,
    },
    icon:{
      position:'absolute',
      right: 20,
      top: 10,
    },
  iconuser:{
      alignSelf:'flex-end',
      position:'absolute',
      fontSize:25,
  },
  list:{
    width:'100%',
  },  
  imglist:{
    width:50,
    height:50,
    borderRadius:100,
  },
  itemList:{
    backgroundColor:'#F1F1F1',
  },
  itemTitle:{
    fontSize:18,
  },
  itemDescription:{
    fontSize:12,
  },
  btnlist:{
    backgroundColor:"rgb(45,77,118)",
    width:'100%',
    height:'5%',
    alignItems:'center',
    borderRadius:5,
    padding:15,
  },
  btncenter:{
    alignItems:'center',
    alignContent:'center',
    justifyContent:'center',
  },
  btn:{
      width:'100%',
      height:'15%',
      alignItems:'center',
      padding:5,
      alignItems:"flex-end",
  },
  drop:{
    color:'#9e9e9e',
  },
  droview:{
    flex:1,
    height:36,
    width: "90%",
    backgroundColor:'white',
    borderRadius: 5,
    overflow: 'hidden',
    justifyContent:'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  botaofecharmodal:{
    marginTop:10,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  footer:{
      alignItems:'center',
      position:'absolute',
      bottom:0,
      backgroundColor:'#F1F1F1',
      width:'100%',
      height:'10%',
      justifyContent:'center',
  },
  });