import React, { useState } from 'react';
import { View, Text, Slider, StyleSheet } from 'react-native';

const Config = () => {
    
    const [maxDistance, setMaxDistance] = useState(0);

    return (
        <View style={styles.container2}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 40,
                paddingVertical: 20,
            }}>
                <Text style={{
                    color: '#fff',
                }}>Max Distance</Text>
                <View>
                    <Text style={{
                    color: '#fff',
                    fontWeight: 'bold',
                }}>
                        {maxDistance}
                          KM
                    </Text>

                </View>
            </View>

            <View>
                <Slider
                    style={{ width: '100%', height: 40 }}
                    minimumValue={0}
                    maximumValue={100}
                    value={maxDistance}
                    onValueChange={setMaxDistance}
                    step={5}
                    minimumTrackTintColor="#F3BA2F"
                    maximumTrackTintColor="#000000"
                    thumbTintColor="#F3BA2F"
                />

            </View>

        </View>
    )
}

styles = StyleSheet.create({
    container2: {
        flex: 1,
        backgroundColor: '#171E26',
    },

});


export default Config