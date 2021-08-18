import React,{useEffect, useState}from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, FlatList} from 'react-native';
import 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import api from '../services/API'
import storage from '../services/Storage'

export default function Screen ({navigation}) {
    const [data, setData] = React.useState({});

    useEffect(() => {

        async function init(){
            const token = await storage.getData('@storage_sessao');
            const cod = await storage.getData('@storage_cod');
            await api.post(`/autenticacao/registraatividade/clinicam/${cod}`)
            const response = await api.get(`/cameras/cidades/SC/${token}`)
            const dados = response.data
            setData(dados[0])
            
        }
        init()
    }, []);

    const renderItem = ({ item }) => (
        <View  style={styles.space}>
            
              <TouchableOpacity style={styles.botaos} 
              onPress={() => navigation.navigate('Screen', {cidade: item.cid_codigo, titulo: item.cam_titulo})}>
                  
                  <MaterialCommunityIcons style={styles.iconcam} name="video" color="white" size={20} /> 
                  <Text style={styles.text}>{item.cid_nome}</Text> 
              
              </TouchableOpacity>
        
            </View>
    );

    return(
        <SafeAreaView style={styles.container}>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.cid_codigo}
            />
            <View style={styles.footer}>
                <Text>Copyright © Clinitec 2020</Text>
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
    botaos:{
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
    marginLeft:20,
  },
  iconcam:{
    marginLeft:20,
  },
  space:{
    marginTop:20,
    justifyContent:'center',
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
btn:{
    width:'100%',
    height:'15%',
    alignItems:'center',
    padding:5,
    alignItems:"flex-end",
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