import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native'

import Spiner from '../components/Spiner'
import PicSlider from '../components/PicSlider'
import * as Font from 'expo-font';



const ProfileViewer = ({ route }) => {
  const { card } = route.params;
  const [fontsLoaded, setFontsLoaded] = useState(false);

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

  // Call the loadFonts function when the component mounts
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


  if (!card) {
    return (
      <View style={{
        flex: 1,
      }}>
        <Spiner load={true} />
      </View >
    )
  }

  return (
    <View

      style={styles.container}>
      <ScrollView
        style={{
          flexGrow: 1,
        }}
      >

        <PicSlider img={card.photos} />

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 20,
          }}
        >
          <Text
            style={styles.nameText}
          >{card.username}</Text>
          <Text
            style={styles.ageText}
          >{card.age}</Text>
        </View>
        <Text style={styles.desText}
        >Gender: {card.gender}</Text>

        <Text style={styles.desText}
        >Orientation: {card.orientation}</Text>

        <Text style={styles.desText}
        >City: {card.city}</Text>

        <Text style={styles.desText}
        >Country: {card.country}</Text>

        <Text style={styles.desText}
        >Tags:</Text>

        {
          card.tags.map((tag, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginHorizontal: 20,
                  backgroundColor: '#F3BA2F',
                  borderRadius: 10,
                  padding: 5,
                  marginVertical: 5,

                }}
              >
                <Text style={{
                  fontFamily: 'Lexend-Regular',
                  fontSize: 17,
                  color: '#FFF',
                  marginTop: 0,
                  marginLeft: 0,
          

                }}
                >{tag}</Text>
              </TouchableOpacity>
            )
          }
          )
        }
      </ScrollView>

    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  nameText: {
    fontFamily: 'Lexend-Bold',
    fontSize: 30,
    color: '#FFF',
    marginTop: 10,
  },
  ageText: {
    fontFamily: 'Lexend-Regular',
    fontSize: 24,
    color: '#FFF',
    marginTop: 10,
    marginLeft: 25,
  },

  desText: {
    fontFamily: 'Lexend-Regular',
    fontSize: 17,
    color: '#FFF',
    marginTop: 10,
    marginLeft: 25,
  }



})


export default ProfileViewer