import React , {useState, useEffect} from 'react';
import { View, FlatList, Image, StyleSheet, Text,TouchableOpacity } from 'react-native';

const PicSlider = ({img}) => {




  const images = img.map((photo, index) => ({
    id: (index + 1).toString(),
    source: photo,
    name: "John Doe"
  }));



  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.itemContainer}>
        <View style={styles.imageContainer}>
          <Image source={
            {uri:item.source}
          } style={styles.image} />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={images}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    marginTop: 10,
    marginRight: 1,
    flexDirection: 'column',
  },
  imageContainer: {
    borderRadius: 5,
    overflow: 'hidden',
  },
  image: {
    width: 300,
    height: 300,
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

export default PicSlider;