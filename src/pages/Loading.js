import { ActivityIndicator, View, StyleSheet, Text } from 'react-native';
import React from 'react';


export default function Loading({navigation}) {
    return(
        <View style={styles.ActivityBackground}>
            <ActivityIndicator
            size="large"
            color="white"
            />
            <Text style={styles.ActivityTexto}>
                Aguarde, por favor.
            </Text>
        </View>
    );
}
const styles = StyleSheet.create({
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
});