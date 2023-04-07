import React, { useState, useEffect } from 'react';
import { View, Text, Slider, StyleSheet } from 'react-native';
import { throttle } from 'lodash';

const LineSlider = ({ title, sliderValue, setSliderValue }) => {
  let sliderTimeoutId;
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}  {sliderValue}</Text>

      <Slider
        style={{ width: '100%', height: 40 }}
        minimumValue={0}
        maximumValue={100}
        value={sliderValue}
        onValueChange={
          throttle(value => {
            setSliderValue(value);
          }, 300)
        }
        step={5}
        minimumTrackTintColor="#F3BA2F"
        maximumTrackTintColor="#000000"
        thumbTintColor="#F3BA2F"
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  text: {
    textAlign: 'justify',
    marginVertical: 0,
    paddingVertical: 0,
    fontWeight: 'bold',
    color: '#000',
  }
});

export default LineSlider;