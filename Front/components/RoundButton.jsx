
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import * as Font from 'expo-font';


const RoundButton = ({ onPress, text, coming, pro }) => {

    const [buttonColor, setButtonColor] = useState('#181E25'); // initial color
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

    // Call the loadFonts function when the component mounts
    React.useEffect(() => {
        loadFonts();
    }, []);


    const handlePressIn = () => {
        setButtonColor('#F3BA2F'); // change color when pressed
    };

    const handlePressOut = () => {
        setButtonColor('#181E25'); // change back to original color when released
    };


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

            <TouchableOpacity
                style={[{ backgroundColor: buttonColor }, styles.button]}
                onPress={onPress}
                onPressIn={handlePressIn}
                
                onPressOut={handlePressOut}
                activeOpacity={0.9}
            >

                <Text style={styles.text}>{text}</Text>
            </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        borderRadius: 25,
        borderColor: '#F3BA2F',
        borderWidth: 1,
        padding: 10,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: '#FFFF',
        textAlign: 'center',
        fontSize: 16,
        fontFamily: 'Lato-Regular',
        marginVertical: 0,
    },
});
export default RoundButton;