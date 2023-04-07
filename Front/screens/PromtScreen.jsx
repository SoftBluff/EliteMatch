import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import Spiner from '../components/Spiner';

const Card2 = ({ card }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: card.photos[0] }} style={styles.image} />
      <Text style={styles.text}>{card.username}</Text>
      <Text style={styles.text2}>Age: {card.age}</Text>
      <Text style={styles.text3}>{card.city} {card.country}</Text>
    </View>
  );
};

const PromptScreen = () => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [submit, setSubmit] = useState(false);


  const handleSubmit = () => {
    setLoading(true);
    setSubmit(true);
    // Do something with the text input
    console.log(`User entered: ${text}`);
    // Simulate a network request
    setTimeout(() => {
      setLoading(false);
    }, 2000);

    // Reset the text input
    setText('');
  }

  return (
    <View style={styles.container}>
      <Spiner load={loading} />

      {
        submit ? <Text style={styles.title}>Your prompt is: {text}</Text> : <>
          <Text style={styles.title}>Enter a Prompt:</Text>
          <TextInput
            style={styles.input}
            value={text}
            onChangeText={setText}
            placeholder="Type your prompt here..."
            //plase holder text
            placeholderTextColor={'#F3BA2F'}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </>


      }



    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#F3BA2F',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    width: '100%',
    color: '#F3BA2F',
  },
  button: {
    backgroundColor: '#F3BA2F',
    padding: 10,
    borderRadius: 20,
    width: '100%',
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PromptScreen;
