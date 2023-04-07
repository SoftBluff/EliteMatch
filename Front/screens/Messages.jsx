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
import Spiner from '../components/Spiner';
import axios from 'axios';



const ChatScreen = ({ route }) => {


  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const scrollViewRef = useRef(null); // create a ref for the Screw
  const [load, setLoading] = useState(false);
  const {spicy , funny , romantic , creative} = route.params;

  useEffect(() => {
    setLoading(true);
    const getMessages = async () => {

    axios.get('https://bluffychat.uc.r.appspot.com/getMessages', {
      params: {
        sender_id: 1,
        receiver_id: 335
      }
    })
      .then(response => {
        const formattedMessages = response.data.map(msg => {
          return {
            text: msg.txt,
            sent: msg.isSender
          };
        });
        setMessages(formattedMessages);
      })
      .catch(error => {
        console.error(error);
      });

    };

    getMessages();
    setLoading(false);


  }, []);

  // function to send a new message
  const handleSendMessage = async () => {

    if (newMessage.trim() === '') return; // don't send empty messages

    scrollViewRef.current.scrollToEnd({ animated: true });
    setLoading(true);

    const inputMessage = newMessage;
    setNewMessage('');

    const newMessages = [
      ...messages,
      { text: inputMessage, sent: true },
    ];

    setMessages(newMessages);

    const lastFiveMessages = messages.slice(-5);
    const messagesArray = lastFiveMessages.map((message) => ({
      role: message.sent ? 'user' : 'assistant',
      content: message.text,
    }));

    //primt messagesArray in a loop to see if it works

    for (let i = 0; i < messagesArray.length; i++) {
      console.log(messagesArray[i]);
    }

    //delete empty messagesq
    for (let i = 0; i < messagesArray.length; i++) {
      if (messagesArray[i].content === '') {
        messagesArray.splice(i, 1);
      }
    }



    // try {
    //   // call the API to generate a response message
    //   console.log('Calling API...');
    //   console.log('spicy: ', spicy);
    //   console.log('funny: ', funny);
    //   console.log('romantic: ', romantic);
    //   console.log('creative: ', creative);

    //   const response = await axios.post(
    //     'https://bluffychat.uc.r.appspot.com/generateTextFromMessages',
    //     {
    //       "description": "You are an man of age 20 who is texting a 22 year old girl.",
    //       "messages": messagesArray,
    //       "weights": {
    //         "spicy": spicy,
    //         "funny": funny,
    //         "romantic": romantic,
    //         "creative": creative
    //       },
    //       "maxWords": 10,
    //       "language": "spanish"
    //     }
    //   );

    //   const newMessages = [
    //     ...messages,
    //     { text: inputMessage, sent: true },
    //     { text: response.data.content, sent: false }
    //   ];
    //   setMessages(newMessages);

    //   scrollViewRef.current.scrollToEnd({ animated: true });
    // } catch (error) {
    //   console.log('API call failed', error);
    // }

    setLoading(false);
  };


  // function to copy a message to clipboard
  const handleCopyMessage = (text) => {
    Clipboard.setString(text);
  };

  const IAauto  =  async() => {
    console.log('IAauto');

    setLoading(true);

    if (spicy){
    const response = await axios.post(
        'https://bluffychat.uc.r.appspot.com/bluffyChat',
        {
          "description": "You are an man of age 20 who is texting a 22 year old girl. short answer",
          "messages": [
    {"role": "user", "content": "Hello,how are you?"},
          ],
          "weights": {
            "spicy": spicy,
            "funny": funny,
            "romantic": romantic,
            "creative": creative
          },
          "maxWords": 10,
          "language": "english"
        }
      ).then(response => {
        console.log(response.data.content);
        setNewMessage(response.data.content);
      })  
      console.log('spicy: ', spicy);
    }else{
      const response = await axios.post(
        'https://bluffychat.uc.r.appspot.com/bluffyChat',
        {
          "description": "You are an man of age 20 who is texting a 22 year old girl. short answer",
          "messages": [
    {"role": "user", "content": "Hello,how are you?"},
          ],
          "weights": {
            "spicy": 50,
            "funny": 50,
            "romantic": 50,
            "creative": 50
          },
          "maxWords": 10,
          "language": "english"
        }
        
      ).then(response => {
        console.log(response.data.content);
        setNewMessage(response.data.content);
      }) 
      

      console.log("yiiiii");
    }

    setLoading(false);

  }


  return (
    <View style={styles.container}>

      <Spiner load={load} />
      <ScrollView
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
        keyboardShouldPersistTaps="always"
        ref={scrollViewRef}
      >
        {
          messages.length === 0 ?
            <View style={styles.welcomeContainer}>
              <Text style={styles.welcomeText}>No Messages :(</Text>

            </View>
            : null

        }

        {messages.map((message, index) => (

          <View style={[
            message.sent ? null : styles.recivedicon,
          ]}>
            <TouchableOpacity
              key={index}
              style={[
                styles.messageBubble,
                message.sent ? styles.sentBubble : styles.receivedBubble,
              ]}
              onPress={() => handleCopyMessage(message.text)}
            >

              {
                message.sent ?
                  <Text style={styles.messageText2}>{message.text}</Text>
                  :
                  <View>

                    <Text style={styles.messageText}>{message.text}</Text>
                  </View>

              }

            </TouchableOpacity>





          </View>



        ))}


        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>

        </View>

      </ScrollView>
      <KeyboardAvoidingView style={styles.inputContainer}>

        <TextInput
          style={styles.input}
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Type a message"
          multiline={true}
          numberOfLines={null}
          onSubmitEditing={handleSendMessage}
          blurOnSubmit={false} // prevent keyboard from hiding after submitting
        />
        <TouchableOpacity style={styles.sendButton} onPress={IAauto}>
          <Text style={styles.sendButtonText}>IA AUTO</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>


      </KeyboardAvoidingView>
    </View>
  );
};



const styles = StyleSheet.create({
  welcomeContainer: {
    flex: 1,
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    color: '#333333',
  },
  container: {
    flex: 1,
    backgroundColor: '#181E25',
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 30,
  },
  messagesContent: {
    paddingBottom: 60, // add extra padding to the bottom
  },
  messageBubble: {
    maxWidth: '70%',
    padding: 8,
    borderRadius: 8,
    marginBottom: 8,
  },
  sentBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#F3BA2F',
    color: '#fff',
  },
  receivedBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#f2f2f2',
  },
  messageText: {
    fontSize: 16,
    fontWeight: '500',
  },
  messageText2: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    backgroundColor: '#eee',
    borderRadius: 20,
    marginRight: 10,
    multiline: true,
  },
  recivedicon: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  sendButton: {
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#F3BA2F',
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: '500',

  },

});

export default ChatScreen;