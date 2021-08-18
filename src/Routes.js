import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Inicio from './pages/Inicio';
import Login from './pages/Login';
import Views from './pages/Views';
import Screen from './pages/Screen';
import Cidades from './pages/Cidades'
import Todas from './pages/Todas';
import Bairros from './pages/Bairros';
import Loading from './pages/Loading';

export default function Routes() {
    const Stack = createStackNavigator();
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown: false}}>
                <Stack.Screen name="Login" component={Login}/>
                <Stack.Screen name="Inicio" component={Inicio}/>
                <Stack.Screen name="Views" component={Views}/>
                <Stack.Screen name="Screen" component={Screen}/>
                <Stack.Screen name="Cidades" component={Cidades}/>
                <Stack.Screen name="Todas" component={Todas}/>
                <Stack.Screen name="Bairros" component={Bairros}/>
                <Stack.Screen name="Loading" component={Loading}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({

    backgroud:{
        width:'100%',
        height:'90%',
        backgroundColor:'white',
    }
});
    