import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import { View, StyleSheet, Image} from 'react-native';
import StatusBarColor from '../components/StatusBarColor';
import { IconButton } from 'react-native-paper';
import MyTabs from './Tabs';
import api from '../services/API'
import storage from '../services/Storage'
import { useState } from 'react';

export default function Inicio({navigation}) {
  const[token, setToken] = useState()
  useEffect(() => {
    async function init(){
      const token = await storage.getData('@storage_sessao')
      const cod = await storage.getData('@storage_cod');
      setToken(token)
      await api.put(`/autenticacao/registraatividade/clinicam/${cod}`)
    }
    init()
}, []);
  
  return (
    <View style={styles.backgroud}>

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
      <MyTabs/>
  </View>
  );
};

const styles = StyleSheet.create({

  backgroud:{
      width:'100%',
      height:'100%',
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
      alignSelf:'flex-end',
      position:'absolute',
      fontSize:25,
  },
  viewSearch:{
    marginTop: 0,
    marginBottom: 0,
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
    top: 12,
  },

  footer:{
      alignItems:'center',
      position:'absolute',
      bottom:0,
      backgroundColor:'#F1F1F1',
      width:'100%',
      height:'5%',
      justifyContent:'center',
  },

});