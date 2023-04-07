import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, StatusBar, Text, View, Button, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Font from 'expo-font';
import RoundButton from '../components/RoundButton';
import CustomTextInput from '../components/CustomTextInput';
import Container, { Toast } from 'toastify-react-native';
import axios from 'axios';
import { Fold } from 'react-native-animated-spinkit'
const LoginScreen = ({ setlogin }) => {
  const navigation = useNavigation();
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [load, setLoad] = useState(false);

  const handleSubmit = async () => {
    Toast.error("Invalid email or pswd");
  };
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

  const Spiner = ({ load }) => {

    if (load) {
      return (
        <View style={styles.spiner}>
          <Fold size={48} color="#F3BA2F" />
        </View>
      )
    } else {
      return null;
    }

  }


  // Call the loadFonts function when the component mounts
  React.useEffect(() => {
    loadFonts();
  }, []);

  handleLogin = async () => {

    console.log ('email', email);
    console.log ('password', password);

    setLoad(true);

    try {
      const response = await axios.post('https://bluffychat.uc.r.appspot.com/login', {
        email: email,
        password: password,
      });

      if (response.status === 200) {
        setlogin(true);
        navigation.navigate('Main');
      }
    } catch (error) {
      if (error.response.status === 502) {
        handleSubmit();
      } else {
        handleSubmit();
        console.log('An error occurred:', error);
      }
    }
    setLoad(false);
  }


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
      <Container position="top"
        animationIn="bounceIn"
      />
      <Spiner load={load} />

      <ScrollView contentContainerStyle={styles.scrollContainer}>

        <View style={{
          width: '100%',
          paddingHorizontal: 40,
        }}>

          <Text style={styles.titleText}>
            Hello there,</Text>
          <Text style={styles.titleText}>
            Welcome back</Text>

        </View>


        <View style={
          {
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }
        }>
          <CustomTextInput label="EMAIL ADDRESS" pwsd={false}
            text={email} setText={setEmail} />

          <CustomTextInput label="PASSWORD" pwsd={true}
            text={password} setText={setPassword}
          />
        </View>

        <RoundButton onPress={handleLogin} text="SIGN IN" />

        {/* onPress={() => navigation.navigate('SingUp')} */}
        <TouchableOpacity
          onPress={() => navigation.navigate('RegisterScreen')}
        >
          <Text style={styles.singUpText}> New here?.. Sing up instead</Text>
        </TouchableOpacity>
      </ScrollView>
    </View >
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
    fontFamily: 'Lato-Regular',
  },
  titleText: {
    fontSize: 32,
    color: '#F3BA2F',
    fontFamily: 'Lexend-Light',
  },
  spiner: {
    position: 'absolute',
    top: '50%',
    left: '45%',
    transform: [{ translateX: -24 }, { translateY: -24 }],
    zIndex: 9999,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 10,
    padding: 20,
  }


})


export default LoginScreen
