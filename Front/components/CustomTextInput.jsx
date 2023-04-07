import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Text } from 'react-native';
import * as Font from 'expo-font';


const CustomTextInput = ({ label , pwsd ,text, setText}) => {

  const [fontsLoaded, setFontsLoaded] = useState(false);
  // Load the custom fonts
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
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        placeholderTextColor="#BDBDBD"
        secureTextEntry={pwsd}
        underlineColorAndroid="transparent"
      />
      <View style={styles.bottomLine} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
    width: '80%',
  },
  label: {
    color: '#F3BA2F',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 0,
    fontFamily: 'Lato-Regular',
  },
  input: {
    height: 40,
    borderWidth: 0,
    color: '#FFF',
    fontSize: 16,
    backgroundColor: '#181E25',
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  bottomLine: {
    height: 1,
    backgroundColor: '#FFFF',
  },
});

export default CustomTextInput;