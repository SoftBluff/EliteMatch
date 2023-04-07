import React, { useState } from 'react';
import { SafeAreaView,Pressable, StyleSheet, StatusBar, Text, View, Image, TouchableOpacity ,Modal } from 'react-native';
import icon from '../assets/img/eliteicon.png';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Slider from '../components/Slider';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

const MessagesHeader = () => {

    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [spicy, setSpicy] = useState(0);
    const [funny, setFunny] = useState(0);
    const [romantic, setRomantic] = useState(0);
    const [creative, setCreative] = useState(0);

    const onPressGearIcon = () => {
        setModalVisible(true);
    };


    const closeModal = () => {


        navigation.navigate('Messages', {
            spicy: spicy,
            funny: funny,
            romantic: romantic,
            creative: creative
        });



        setModalVisible(false);
    };

    return (
        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 10,
            paddingVertical: 0,
        }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>

                <FontAwesome name="arrow-left" size={25} color="#F3BA2F" />
            </TouchableOpacity>

            <TouchableOpacity onPress={onPressGearIcon}>
                <FontAwesome name="sliders" size={25} color="#F3BA2F" />
        

            </TouchableOpacity>
            <Modal
        visible={modalVisible}
        onRequestClose={closeModal}
        animationType="fade"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}> Make it unique! 🌟</Text>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 20,
            }}>
            </View>

            {/* <LinePicker /> */}

            <Slider title={"Spicy:"} sliderValue={spicy} setSliderValue={setSpicy} />
            <Slider title={"Funny:"} sliderValue={funny} setSliderValue={setFunny} />
            <Slider title={"Romantic:"} sliderValue={romantic} setSliderValue={setRomantic} />
            <Slider title={"Creative:"} sliderValue={creative} setSliderValue={setCreative} />

            <View style={
              {
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 20,

              }
            }>

              <Pressable style={styles.modalButton} onPress={closeModal}>
                <Text style={styles.modalButtonText}>Close</Text>
              </Pressable>
            </View>




          </View>
        </View>
      </Modal>
        </View>
    )
}


const styles = StyleSheet.create({
    headerContainer: {
      height: 60,
      backgroundColor: 'transparent',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
    },
    modalContainer: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
    },
  
    modalsubtitle: {
      fontSize: 20,
      marginLeft: 10,
      marginVertical: 0,
      
    },
  
    modalButton: {
      backgroundColor: '#000',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 20,
      alignSelf: 'flex-end',
    },
    modalButtonText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 16,
    },
  });

export default MessagesHeader