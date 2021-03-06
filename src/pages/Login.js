import React, { useState, useEffect } from 'react';
import { View, Text, KeyboardAvoidingView, StyleSheet, TextInput, Pressable, TouchableOpacity, Image, Animated, Alert, Modal, Linking } from 'react-native';
import StatusBarColor from '../components/StatusBarColor'
import api from '../services/API';
import storage from '../services/Storage'

export default function Login({ navigation }) {

    const [offset] = useState(new Animated.ValueXY({ x: 0, y: 95 }));
    const [opacity] = useState(new Animated.Value(0));
    const [user, setUser] = useState();
    const [pass, setPass] = useState();
    const [loading, setLoading] = useState(true);
    const [rateModal, setRateModal] = useState(false);

    useEffect(() => {
        async function pegar() {
            if (await storage.getData('@storage_user') && await storage.getData('@storage_pass')) {
                const user = await storage.getData('@storage_user');
                const pass = await storage.getData('@storage_pass');
                const firstAcess = await storage.getData('@storage_firstAcess');
                const rated = await storage.getData('@storage_rated');
                console.log(firstAcess, rated);
                if (firstAcess !== null && rated === null) {
                    setRateModal(true);
                }
                setUser(user);
                setPass(pass);
            }
        }
        Animated.parallel([
            Animated.spring(offset.y, {
                toValue: 0,
                speed: 3,
                bounciness: 20,
                useNativeDriver: true,
            }),
            Animated.timing(opacity, {
                toValue: 1,
                duration: 2,
                useNativeDriver: true,
            })
        ]).start();
        pegar();
    }, []);

    async function handleRate() {
        await storage.storeData('@storage_rated', 'true');
        setRateModal(false);
        Linking.openURL('https://play.google.com/store/apps/details?id=com.cameraclinitec');
    }

    async function handleLogin() {
        if (!user || !pass) {
            Alert.alert("Campo Vazio", "Preencha todos os campos")
        } else {
            await storage.storeData('@storage_user', user)
            await storage.storeData('@storage_pass', pass)
            try {
                const response = await api.get(`/autenticacao/autentica/clinicam/${user}/${pass}`)
                setLoading(false)
                await storage.storeData('@storage_firstAcess', 'true')
                if (loading) {
                    setLoading(true)
                    navigation.navigate('Loading');
                }
                const subscriberId = JSON.parse(response.data[0]);

                if (subscriberId.access == true) {
                    const autoriza = await api.get(`/autenticacao/autoriza/clinicam/${subscriberId.subscriberId}`);
                    console.log('Autoriza????o ' + autoriza.data);
                    if (!autoriza) {
                        Alert.alert('Usu??rio n??o autorizado')
                    } else {
                        const response = await api.post(`/autenticacao/gerasessao/clinicam/${subscriberId.subscriberId}`);
                        const token = response.data[0].ses_token;
                        const cod = response.data[0].ses_codigo;

                        if (!token || !cod == 'undefined') {
                            Alert.alert('J?? est?? logado, tenta novamente')
                            const sessao_logada = await storage.getData('@storage_sessao')
                            await api.put(`/autenticacao/encerrasessao/clinicam/${sessao_logada}`)
                            navigation.navigate('Login');
                        } else {
                            api.post(`/autenticacao/registraatividade/clinicam/${cod}`)
                            await storage.storeData('@storage_sessao', token);
                            await storage.storeData('@storage_cod', cod);
                            navigation.navigate('Inicio');
                        }
                    }
                } else {
                    navigation.navigate('Login')
                    Alert.alert('Usu??rio ou senha inv??lida');
                }
            } catch (error) {
                console.log(error)
                Alert.alert('Algo deu errado!', 'Texte mais tarde')
            }
        }
    }
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <KeyboardAvoidingView style={styles.backgroud}>

            <StatusBarColor backgroundColor='rgb(45,77,118)' barStyle='light-content' />

            <View style={styles.centerlogo}>
                <Image style={styles.logo} source={require('../img/Logo2.png')} />
            </View>

            <Animated.View style={[styles.inputs, {
                transform: [
                    { translateY: offset.y }
                ]
            }]}>

                <Text style={styles.textologin}> Insira seu usu??rio e senha para acessar as c??meras! </Text>

                <TextInput
                    style={styles.input}
                    placeholder="Usu??rio"
                    autoCorrect={false}
                    autoCapitalize="none"
                    value={user}
                    onChangeText={setUser}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Senha"
                    autoCorrect={false}
                    autoCapitalize="none"
                    secureTextEntry={true}
                    value={pass}
                    onChangeText={setPass}
                />

                <TouchableOpacity
                    style={styles.botao}
                    onPress={handleLogin}>
                    <Text style={styles.textobotao}>Entrar</Text>
                </TouchableOpacity>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Para visualizar as c??meras informe seu Usu??rio e Senha utilizado para acessar a ??rea do Cliente!</Text>
                        <View>
                            <Image style={styles.modalImage} source={require('../img/areacliente.png')} />
                        </View>
                        <Pressable
                            style={styles.buttonClose}
                            onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={styles.textStyle}>Ok, entendi</Text>
                        </Pressable>
                    </View>
                </Modal>
                <Pressable
                    style={[styles.button, styles.buttonOpen]}
                    onPress={() => setModalVisible(true)}>
                    <Text>Como acessar?</Text>
                </Pressable>

            </Animated.View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={rateModal}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Avalie o nosso APP na PlayStore!</Text>
                    <Text style={styles.modalText}>???????????????</Text>
                    <TouchableOpacity
                        style={styles.buttonClose}
                        onPress={handleRate}>
                        <Text style={styles.textStyle}>Avaliar agora</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.buttonClose2}
                        onPress={() => setRateModal(false)}>
                        <Text style={styles.textStyle2}>Mais tarde</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
            <View style={styles.footer}>
                <Text>Copyright ?? Clinitec 2021</Text>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({

    backgroud: {
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    modalView: {
        marginTop: 200,
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
    centerlogo: {
        alignItems: 'center',
        backgroundColor: 'rgb(45,77,118)',
        width: '100%',
        height: '40%',
        justifyContent: 'center',
    },
    logo: {
        width: 250,
        height: 100,
        resizeMode: 'contain',
        marginBottom: 35,
    },
    botao: {
        backgroundColor: '#FF9700',
        width: '90%',
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
    textobotao: {
        color: '#FFF',
        fontSize: 15
    },
    textologin: {
        textAlign: 'center',
        marginBottom: 30,
    },
    inputs: {
        position: 'relative',
        bottom: 70,
        padding: 20,
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F1F1F1',
        borderRadius: 5,
        marginVertical: 10,
    },

    input: {
        backgroundColor: '#FFF',
        width: '90%',
        marginBottom: 15,
        color: '#222',
        fontSize: 12,
        borderRadius: 5,
        padding: 5,
        justifyContent: 'center',
    },
    buttonClose: {
        backgroundColor: '#FF9700',
        width: '90%',
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        marginTop: 10,
    },
    buttonClose2: {
        width: '90%',
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        marginTop: 10,
    },
    modalButton: {
        marginTop: 10,
    },
    textStyle: {
        color: 'white',
    },
    textStyle2: {
        color: 'black',
    },
    modalImage: {
        alignItems: "center",
        margin: 15,
        width: 350,
        height: 200,
        resizeMode: 'contain',
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

});
