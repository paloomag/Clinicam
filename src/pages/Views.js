import React, { useEffect } from 'react';
import { View, StyleSheet, BackHandler, StatusBar, ActivityIndicator, Text, Alert } from 'react-native';
import 'react-native-gesture-handler';
import { LivePlayer } from "react-native-live-stream";
import Orientation from 'react-native-orientation';
import api from '../services/API'
import storage from '../services/Storage'
import { useState } from 'react';

export default function Views({ navigation, route }) {
    const { url, titulo, cam_codigo } = route.params
    const token = storage.getData('@storage_sessao')
    const [views, setView] = useState()
    useEffect(() => {
        const backAction = async () => {
            await Orientation.lockToPortrait();
            navigation.navigate('Inicio')
        };

        BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );
        async function init() {
            await Orientation.lockToLandscape();
            const cod = await storage.getData('@storage_cod');
            await api.put(`/autenticacao/registraatividade/clinicam/${cod}`)
            await api.post(`/cameras/registravisualizacao/${cam_codigo}/${token}`)
        }
        init()
    }, []);

    return (
        <View style={styles.backgroud}>
            <StatusBar hidden={true} />
            <View>
                <LivePlayer source={{ uri: url }}
                    style={styles.backgroundVideo}
                    paused={false}
                    muted={false}
                    bufferTime={300}
                    maxBufferTime={1000}
                    resizeMode={"contain"}
                    onEnd={() => {
                        return (
                            <View>
                                <ActivityIndicator
                                    size="large"
                                    color="white"
                                />
                            </View>
                        )
                    }}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({

    backgroundVideo: {
        width: "100%",
        height: "100%",

    },

    backgroud: {
        width: '100%',
        height: '100%',
        backgroundColor: 'black',
    },

    nav: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgb(45,77,118)',
        width: '100%',
        height: '8%',
    },

    logo: {
        width: 150,
        height: 100,
        resizeMode: 'contain',
    },

    iconuser: {
        alignSelf: 'flex-end',
        position: 'absolute',
        fontSize: 25,
    },
    title: {
        alignItems: 'center',
        marginTop: 20,
    },
    imglist: {
        width: 50,
        height: 50,
        borderRadius: 100,
    },
    itemList: {
        backgroundColor: '#F1F1F1',
    },
    itemTitle: {
        fontSize: 20,
    },
    itemDescription: {
        fontSize: 15,
    },
    btnVisu: {
        flex: 1,
        width: '20%',
        justifyContent: 'center',
        backgroundColor: 'orange',
        margin: 0,
        padding: 5,
    },
    btnfullscreen: {
        flex: 1,
        width: '35%',
        justifyContent: 'center',
        backgroundColor: 'rgb(45,77,118)',
        margin: 0,
        padding: 15,
    },
    btn: {
        width: '100%',
        height: '15%',
        alignItems: 'center',
        padding: 5,
        alignItems: "flex-end",
    },
    btnview: {
        width: '100%',
        height: '40%',
    },
    viewSearch: {
        marginTop: 0,
        backgroundColor: '#FFF',
        elevation: 2.5,
        borderRadius: 0,
        marginVertical: 10,
        width: '100%',
        flexDirection: 'row',
        alignSelf: 'center'
    },
    input: {
        width: '90%',
        padding: 8,
        paddingLeft: 20,
        fontSize: 15,
    },
    icon: {
        position: 'absolute',
        right: 20,
        top: 10,
    },
    footer: {
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        backgroundColor: '#F1F1F1',
        width: '100%',
        height: '10%',
        justifyContent: 'center',
    },

})