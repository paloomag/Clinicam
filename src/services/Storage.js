import React from 'react';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'

const storeData = async (nome,value) => {
    try {
      await AsyncStorage.setItem(nome, value)
    } catch (e) {
      Alert.alert(e)
    }
  }
const getData = async (nome) => {
  try {
    const data = await AsyncStorage.getItem(`${nome}`);
    return data;
  } catch(e) {
    Alert.alert(e)
  }
}
//'@storage_sessao'

module.exports = {
  storeData,
  getData
}