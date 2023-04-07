import React , {useState,useEffect} from 'react';
import { View, FlatList, Image, StyleSheet, Text,TouchableOpacity } from 'react-native';
import axios from 'axios';
const MachSlider = () => {
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
                console.log(response.data);
               
              })
              .catch(error => {
                console.error(error);
              });


      }
      getdata();
      
      setLoad(false);
      
  }, []);



  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.itemContainer}>
        <View style={styles.imageContainer}>
          <Image source={
            {uri:item.profilePic}
          } style={styles.image} />
        </View>
        <Text style={styles.title}>{item.username}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <>
    <FlatList
      data={matches}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
    />

    </>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    marginRight: 10,
    flexDirection: 'column',
  },
  imageContainer: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: 90,
    height: 150,
    resizeMode: 'cover',
  },
  title: {
    marginTop: 5,
    fontSize: 10,
    textAlign: 'center',
    color: '#fff',
    marginBottom: 10,
  },
});

export default MachSlider;