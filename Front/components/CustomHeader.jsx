import React from 'react'
import { SafeAreaView, StyleSheet, StatusBar, Text, View, Image, TouchableOpacity } from 'react-native';
import icon from '../assets/img/eliteicon.png';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useNavigation } from '@react-navigation/native';

const CustomHeader = () => {

  const navigation = useNavigation();

  return (
    <View style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingRight: 25,
      paddingVertical: 0,
    }}>


      <TouchableOpacity onPress={() => navigation.navigate('Home')}>

        <Image source={icon} style={{
          width: 55, height: 55, resizeMode: 'contain',
          padding: 0,
          margin: 0,

        }} />

      </TouchableOpacity>



      <TouchableOpacity onPress={() => navigation.navigate('Config')}>
        <FontAwesome name="sliders" size={25} color="#F3BA2F" />
      </TouchableOpacity>


    </View>
  )
}

export default CustomHeader