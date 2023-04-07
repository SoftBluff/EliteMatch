import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, StatusBar, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';
import Messages from './Messages';
import MessagesList from './MessagesList';

import CustomHeader from '../components/CustomHeader';
import PromptScreen from './PromtScreen';

import { FontAwesome } from '@expo/vector-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


const MainScreen = () => {

    const [loggedIn, setLoggedIn] = useState(false);
    // If the user is not logged in, show the login screen
    if (!loggedIn) {
        return <LoginScreen setlogin={setLoggedIn} />;
    }

    // If the user is logged in, show the tab navigator
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="heart" size={20} color={color} />
                    ),
                    header: () => <CustomHeader  />,
                    
                }}
    
            />
            <Tab.Screen
                name="Prompt"
                component={PromptScreen}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="terminal" size={20} color={color} />
                    ),
                    header: () => <CustomHeader  />,
                }}
            />
            <Tab.Screen
                name="MessagesL"
                component={MessagesList}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesomeIcon icon={faComment} size={20} color={color} />
                    ),
                    header: () => <CustomHeader />,
                }}
            />



            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="user" size={20} color={color} />
                    ),
                }}
            />

        </Tab.Navigator>
    );



}


export default MainScreen