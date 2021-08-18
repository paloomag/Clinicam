import React, { useEffect, useState} from 'react';
import { View, StyleSheet, TouchableOpacity, Image, FlatList, ActivityIndicator, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { List } from 'react-native-paper';
import api from  '../services/API';
import { SafeAreaView } from 'react-native';
import storage from '../services/Storage'


export default function Todas ({route, navigation}) {

    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function init(){
            const token = await storage.getData('@storage_sessao')
            const cod = await storage.getData('@storage_cod');
            await api.put(`/autenticacao/registraatividade/clinicam/${cod}`)
            const response = await api.get(`/cameras/cameras/${token}`).then(res=>{
                setLoading(false)
                return res
            })
            const dados = response.data
            setData(dados[0])
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
                    onPress={() => navigation.navigate('Views', {cod_cam: item.cam_codigo, url:item.cam_url, titulo: item.cam_titulo})}> Visualizar</Icon.Button> 
                </TouchableOpacity>}
            />
        </View>
    );
    
        return(
            <SafeAreaView style={styles.backgroud}>
            {
                loading ?(
                    <View style={styles.ActivityBackground}>
                        <ActivityIndicator
                        size="large"
                        color="white"
                        />
                        <Text style={styles.ActivityTexto}>
                            Aguarde, por favor.
                        </Text>
                    </View>
                ):(
                   
                        <View style={styles.list}>
                            <FlatList
                                data={data}
                                renderItem={renderItem}
                                keyExtractor={item => item.cam_codigo}
                            />
                        </View>
                    
                )
            }
            </SafeAreaView>
        );
}


const styles = StyleSheet.create({

    backgroud:{
        alignItems:'center',
        width:'100%',
        height:'100%',
    },
    ActivityBackground:{
        justifyContent:'center',
        alignItems:'center',
        width:'100%',
        height:'100%',
        backgroundColor:'rgb(45,77,118)',
    },
    ActivityTexto:{
        color:'white',
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

    iconuser:{
        color:'white',
        alignSelf:'flex-end',
        position:'absolute',
        fontSize:25,
        padding:15,

    },

    subnav:{
        alignItems:'center',
        justifyContent: 'center',
        backgroundColor:'rgb(45,77,118)',
        marginTop:1,
        width: '100%',
        height:'8%' ,
    },
    iconsubnav:{
        color:'white',
        fontSize:20,
        alignItems:'center',
        justifyContent:'center',
        padding:15,
        marginHorizontal:10,

    },
    navrow:{
        flex:1,
        flexDirection:'row',
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
    footer:{
        alignItems:'center',
        position:'absolute',
        bottom:0,
        backgroundColor:'#F1F1F1',
        width:'100%',
        height:'10%',
        justifyContent:'center',
    },

})