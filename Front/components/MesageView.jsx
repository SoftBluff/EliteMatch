import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Clipboard,
  Image,

} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MessageView = ({ userImage, userName, lastMessage }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('Messages');
    console.log('pressed');
  };

  return (
    <TouchableOpacity style={styles.container}
      onPress={handlePress}
    >
      <Image source={{ uri: userImage }} style={styles.userImage} />
      <View style={styles.textContainer}>
        <Text style={styles.userName}>{userName}</Text>
        <Text style={styles.lastMessage}>{lastMessage}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#171E26',


  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
    color: '#fff',
  },
  lastMessage: {
    color: '#666',
    fontSize: 14,
  },
});

export default MessageView