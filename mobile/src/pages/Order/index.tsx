import React from 'react';
import {View, Text, StyleSheet} from 'react-native';


import {useRoute, RouteProp} from '@react-navigation/native';

export default function Order(){
    return(
        <View style={styles.container}>
            <Text>Tela de pedido</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{

    }
})