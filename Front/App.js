
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { SafeAreaView, StyleSheet, StatusBar, Text, View } from 'react-native';

import MainScreen from './screens/MainScreen';
import RegisterScreen from './screens/RegisterScreen';
import Messages from './screens/Messages';
import MessagesHeader from './components/MessagesHeader';
import ProfileViewer from './screens/ProfileViewer';

import Config from './screens/Config';
import React, { useState } from 'react';

const Stack = createStackNavigator();

export default function App() {

  const [spicy, setspicy] = useState(0);
  const [funny, setfunny] = useState(0);
  const [romantic, setromantic] = useState(0);
  const [creative, setcreative] = useState(0);
  
  
  

  return (

    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#181E25" />
      <NavigationContainer
        style={styles.navigationContainer}
        theme={{
          colors: {
            background: '#181E25', // Change the background color of the navigation container to black
            primary: '#F3BA2F', // Change the text color of the navigation container to white
            card: '#181E25', // Change the background color of the navigation cards to black
            border: '#181E25', // Change the color of the borders to white
            text: '#F3BA2F', // Change the text color of the navigation container to white
          },
          dark: true,
        }}

      >

        <Stack.Navigator>

          <Stack.Screen
            name="Main"
            component={MainScreen}
            options={{
              headerShown: false,
              ...TransitionPresets.SlideFromRightIOS 
            }} />

          <Stack.Screen
            name="RegisterScreen"
            component={RegisterScreen}
            options={{
              headerShown: false,
              ...TransitionPresets.SlideFromRightIOS 
            }} />

          <Stack.Screen
            name="Messages"
            component={Messages}
            options={{
              header: () => <MessagesHeader />,
              ...TransitionPresets.SlideFromRightIOS 
            }} 
            initialParams={spicy, funny, romantic, creative}
            />

          <Stack.Screen
            name="Config"
            component={Config}
            options={{
              header: () => <MessagesHeader />,
              ...TransitionPresets.SlideFromRightIOS 
            }} />

          <Stack.Screen

            name="ProfileViewer"
            component={ProfileViewer}
            options={{
              header: () => <MessagesHeader />,
              ...TransitionPresets.ModalSlideFromBottomIOS

            }} />

          {/* <Stack.Screen
            name="text-res"
            options={{
              header: () => <CustomHeader spicy={spicy} funny={funny} romantic={romantic} creative={creative} setspicy={setspicy} setfunny={setfunny} setromantic={setromantic} setcreative={setcreative} />
            }}
            component={TextResponse}
            initialParams={initialParams}
          /> */}


        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#181E25' // Change the background color to black
  },
  navigationContainer: {
    flex: 1,
    backgroundColor: '#181E25' // Change the background color to black
  }
});