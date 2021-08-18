import * as React from 'react';
import { StyleSheet} from 'react-native';
import 'react-native-gesture-handler';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Todas from '../pages/Todas'
import Cidades from '../pages/Cidades'
import { useEffect } from 'react';



const Tab = createMaterialTopTabNavigator();

export default function MyTabs({navigation}) {
  return (
        <Tab.Navigator
            initialRouteName="Picarras"
            tabBarOptions={{
                activeTintColor: '#e91e63',
                style:{
                    backgroundColor:'rgb(45,77,118)', marginTop:1,
                },
                indicatorStyle:{
                    backgroundColor:'#fc852e',
                },
                labelStyle:{
                    fontSize:14,
                    padding:0,
                    margin:0,
                    color:'white'
                },
              }}
        >
            <Tab.Screen
            name="Todas Câmeras"
            component={Todas}
            options={{
                tabBarLabel:'Todas Câmeras',
            }}
            />
            <Tab.Screen
            name="Cidade"
            component={Cidades}
            options={{
                tabBarLabel:'Cidades',
            }}
            />
        </Tab.Navigator>
  );
}
const styles = StyleSheet.create({

    backgroud:{
        alignItems:'center',
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
        height:'100%',
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
        flex:1,
        backgroundColor:"rgb(45,77,118)",
        width:'90%',
        margin:10,
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