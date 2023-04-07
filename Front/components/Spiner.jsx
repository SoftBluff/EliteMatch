import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Fold } from 'react-native-animated-spinkit'

const Spiner = ({load}) => {
    if (load) {
        return (
          <View style={styles.spiner}>
            <Fold size={48} color="#F3BA2F" />
          </View>
        )
      } else {
        return null;
      }
}

const styles = StyleSheet.create({
    spiner: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -24 }, { translateY: -24 }],
        zIndex: 9999,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 10,
        padding: 20,
      }
})

export default Spiner