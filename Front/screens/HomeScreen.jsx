import React, { useEffect, useState, useRef, useImperativeHandle } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import SwipeCards from 'react-native-cards-swipe';
import * as Font from 'expo-font';
import ex from '../assets/img/ex.png';
import check from '../assets/img/check.png';
import elite from '../assets/img/elite.png';
import Spiner from '../components/Spiner';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { set } from 'react-native-reanimated';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowAltCircleUp } from '@fortawesome/free-solid-svg-icons';
const SCREEN_WIDTH = Dimensions.get('window').width;


const Card = ({ card }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: card.photos[0] }} style={styles.image} />
      <Text style={styles.text}>{card.username}</Text>
    </View>
  );
};

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

const HomeScreen = ({ route }) => {
  const navigation = useNavigation();

  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [load, setLoad] = useState(false);
  const [matchme, setMatchMe] = useState(false);
  const [cardid, setCardId] = useState(0);
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


  React.useEffect(() => {
    loadFonts();
  }, []);


  const [cards, setCards] = useState([
    {
      text: 'Card #1',
      photos: ['https://images.unsplash.com/photo-1593642532979-dc7c48d87d81?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FyZCUyMGJhY2tncm91bmR8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&w=1000&q=80'],
    }
  ]);

  
  useEffect(() => {
    setLoad(true);
    const fetchData = async () => {
      try {
        const response = await axios.get('https://bluffychat.uc.r.appspot.com/getPossibleMatches', {
          params: {
            id: '1',
            distance: 1000,
          }
        });
        setCards(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoad(false);
      }
    };

    fetchData();
    // time out to show the spinner
    setTimeout(() => {
      setLoad(false);
    }, 1500);


  }, []);

  const reload = () => {
    setLoad(true);
    if (matchme) {

      const fetchData = async () => {
        try {
          const response = await axios.post('https://bluffychat.uc.r.appspot.com/matchMe', {
            id: '1',
            distance: 1000,
          });
          setCards(response.data.success);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
      //time out to show the spinner
      setTimeout(() => {
        setLoad(false);
        console.log("matchme", matchme);

      }, 1500);

    } else {

      const fetchData = async () => {
        try {
          const response = await axios.get('https://bluffychat.uc.r.appspot.com/getPossibleMatches', {
            params: {
              id: '1',
              distance: 1000,
            }
          });
          setCards(response.data);
        } catch (error) {
          console.log(error);
        } finally {
          setLoad(false);
        }
      };

      fetchData();
      // time out to show the spinner
      setTimeout(() => {
        setLoad(false);
        console.log("matchme", matchme);
      }, 1500);





    }
  }



  const swipeCardsRef = useRef(null);

  const handleYup = (card) => {
    // handle right swipe
    console.log(card);
    setCardId(card + 1);


  };

  const handleNope = (card) => {
    // add the swiped left card to the state variable
    console.log(card);
    setCardId(card + 1);

  };

  const hanleProfile = () => {
    navigation.navigate('ProfileViewer', { card: cards[cardid] });
    console.log(cards[cardid]);
    console.log(cardid);
  }



  // const handleGoBack = () => {
  //   if (currentCardIndex === 0 || currentCardIndex <= 0) {
  //     setCurrentCardIndex(0);
  //     return;
  //   }
  //   // Decrement the current card index
  //   setCurrentCardIndex((prevIndex) => prevIndex - 1);

  //   // Make a copy of the cards array

  //   // Move the current card to the beginning of the array
  //   const [currentCard] = cardsCopy.splice(currentCardIndex, 1);

  //   console.log(currentCard);
  //   cardsCopy.unshift(currentCard);




  //   // Update the state with the new cards array
  //   setCards(cardsCopy);
  //   console.log(cardsCopy);

  // };
  const handleNoCards = () => {
    return (
      <View style={styles.card}>
        <Text style={styles.text}>No More Matches</Text>
      </View>
    );
  };



  const buttoncheck = () => {
    swipeCardsRef.current.swipeRight();
  };

  const buttonex = () => {
    swipeCardsRef.current.swipeLeft();
  };

  const buttonmatchme = () => {


    if (matchme) {
      setMatchMe(false);
    } else {
      setMatchMe(true);
    }
  };


  useEffect(() => {
    reload();
  }, [matchme]);



  if (!fontsLoaded) {
    // Render a loading screen while the fonts are loading
    return (
      <Spiner load={true} />
    );
  }

  return (
    <View style={styles.container}>
      <Spiner load={load} />


      {matchme ?
        <TouchableOpacity style={styles.iaon} onPress={buttonmatchme}>
          <Text style={styles.iaTExt}>AI ON</Text>
        </TouchableOpacity>
        :
        null
      }


      <SwipeCards
        ref={swipeCardsRef}
        cards={cards}
        renderCard={(cardData) => <Card2 card={cardData} />}
        onSwipedRight={handleYup}
        onSwipedLeft={handleNope}
        cardRemoved={() => { }}
        stackSize={1}
        stackSeparation={15}
        dragY
        smoothTransition
        loop={false}
        onNoMoreCards={handleNoCards}
        renderYep={() => (
          <View style={styles.yupContainer}>
            <Text style={styles.yupText}>Yup!</Text>
          </View>
        )}
        renderNope={() => (
          <View style={styles.nopContainer}>
            <Text style={styles.nopText}>Nope!</Text>
          </View>
        )}

        renderNoMoreCard={() => (
          <View style={styles.container}>
            <Text style={{
              color: '#fff',
              fontSize: 24,
              fontFamily: 'Lexend-Light',

            }}>No More Matches 🥵 </Text>

          </View>
        )}
      />

      <TouchableOpacity style={styles.goBackButton} onPress={buttonex}>
        <Image source={ex} style={{
          width: 60,
          height: 60,
          resizeMode: 'contain',
        }} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.check} onPress={buttoncheck}>
        <Image source={check} style={{
          width: 60,
          height: 60,
          resizeMode: 'contain',
        }} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.elite} onPress={buttonmatchme}>
        <Image source={elite} style={{
          width: 65,
          height: 65,
          resizeMode: 'contain',
        }} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.picon}
        onPress={() => hanleProfile()}
      >

        <FontAwesomeIcon icon={faArrowAltCircleUp} size={30} color="#fff" />

      </TouchableOpacity>


    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  card: {
    width: SCREEN_WIDTH * 0.9,
    height: SCREEN_WIDTH * 1.65,
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
  text: {
    position: 'absolute',
    bottom: 156,
    left: 16,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  text2: {
    position: 'absolute',
    bottom: 126,
    left: 16,
    fontSize: 24,
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  text3: {
    position: 'absolute',
    bottom: 90,
    left: 16,
    fontSize: 24,
    color: '#fff',
    fontWeight: 'light',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },

  yupContainer: {
    position: 'absolute',
    top: 56,
    right: -126,
    backgroundColor: 'transparent',
    borderRadius: 8,
    borderColor: '#63de9a',
    borderWidth: 2,
    padding: 8,
  },
  yupText: {
    fontSize: 54,
    fontWeight: 'bold',
    color: '#63de9a',
  },
  nopContainer: {
    position: 'absolute',
    top: 56,
    left: -126,
    backgroundColor: 'transparent',
    borderRadius: 8,
    borderColor: '#ff6b6b',
    borderWidth: 2,
    padding: 8,
  },
  nopText: {
    fontSize: 54,
    fontWeight: 'bold',
    color: '#ff6b6b',
  },

  goBackButton: {
    position: 'absolute',
    zIndex: 1, // set a higher value for the zIndex than the other components
    bottom: 20,
    left: 20,
    backgroundColor: 'transparent',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  check: {
    position: 'absolute',
    zIndex: 1, // set a higher value for the zIndex than the other components
    bottom: 20,
    right: 20,
    backgroundColor: 'transparent',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },

  elite: {
    position: 'absolute',
    zIndex: 1, // set a higher value for the zIndex than the other components
    bottom: 20,
    center: 20,
    backgroundColor: 'transparent',
    paddingVertical: 10,
    paddingHorizontal: 20
  },

  goBackButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  iaon: {
    position: 'absolute',
    zIndex: 1, // set a higher value for the zIndex than the other components
    top: 30,
    left: 30,
    borderRadius: 20,
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderColor: '#F3BA2F',
    borderWidth: 2,
  },
  iaTExt: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F3BA2F',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  picon:
  {
    position: 'absolute',
    zIndex: 1, // set a higher value for the zIndex than the other componentsq
    bottom: 100,
    right: 35,
    paddingVertical: 10,
    paddingHorizontal: 20,
  }
});

export default HomeScreen;
