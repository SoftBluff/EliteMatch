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
import MessageView from '../components/MesageView';
import MachSlider from '../components/MachSlider';
import axios from 'axios';
import Spiner from '../components/Spiner';


const MessagesList = () => {
    const [matches, setMatches] = useState([]);
    const [load, setLoad] = useState(false);


useEffect(() => {

    setLoad(true);
        const getdata = async () => {
            axios.get('https://bluffychat.uc.r.appspot.com/getMatches', {
                params: {
                  id: 1
                }
              })
                .then(response => {
                  setMatches(response.data);
                 
                })
                .catch(error => {
                  console.error(error);
                });


        }
        getdata();
        
        setLoad(false);
        
    }, []);



    return (
        <View style={styles.container}>
            <Spiner load={load} />
            <View>
                <MachSlider />
            </View>

            <ScrollView style={styles.scrollView}>

            {
                matches.map((match, index) => {
                    return (
                        < MessageView
                            key={index}
                            userImage={match.profilePic}
                            userName={match.username}
                            lastMessage={match.lastMessage.txt}
                        />
                    )
                })
            }

            </ScrollView>
        </View>

    )
}

styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#171E26',
    },

    scrollView: {

    },
});



export default MessagesList