import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import * as Font from 'expo-font';
import RoundButton from '../components/RoundButton';
import CustomTextInput from '../components/CustomTextInput';
import { useNavigation } from '@react-navigation/native';

const RegisterScreen = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const navigation = useNavigation();
  // Load the custom fonts

  const handleSingUp = () => {
    navigation.navigate('Main');
  }


  const loadFonts = async () => {
    await Font.loadAsync({
      'Lexend-Light': require('../assets/fonts/Lexend-Light.ttf'),
      'Lexend-Regular': require('../assets/fonts/Lexend-Regular.ttf'),
      'Lexend-Medium': require('../assets/fonts/Lexend-Medium.ttf'),
      'Lexend-SemiBold': require('../assets/fonts/Lexend-SemiBold.ttf'),
      'Lexend-Bold': require('../assets/fonts/Lexend-Bold.ttf'),
      'Lato-Regular': require('../assets/fonts/Lato-Regular.ttf'),
      'Lato-Bold': require('../assets/fonts/Lato-Bold.ttf'),
      'Lato-Black': require('../assets/fonts/Lato-Black.ttf'),
      'Lato-Light': require('../assets/fonts/Lato-Light.ttf'),

    });
    setFontsLoaded(true);
  };
  React.useEffect(() => {
    loadFonts();
  }, []);



  if (!fontsLoaded) {
    // Render a loading screen while the fonts are loading
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={{
          width: '100%',
          paddingHorizontal: 40,
          paddingBottom: 10,
        }}>

          <Text style={styles.titleText}>
            Get Started</Text>


        </View>


        <View style={
          {
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }
        }>

          <CustomTextInput label="NAME" pwsd={false} />
          <CustomTextInput label="EMAIL ADDRESS" pwsd={false} />
          <CustomTextInput label="PASSWORD" pwsd={true} />
          <CustomTextInput label="CONFIRM PASSWORD" pwsd={true} />
        </View>


        <RoundButton onPress={handleSingUp} text="SING UP" />

      </ScrollView>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },

  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  singUpText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Lato-Light',
  },
  titleText: {
    fontSize: 32,
    color: '#F3BA2F',
    fontFamily: 'Lexend-Light',
  },

})

export default RegisterScreen