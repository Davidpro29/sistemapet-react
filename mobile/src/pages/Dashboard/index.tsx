import React, {useState} from 'react';
import {Text, SafeAreaView, TouchableOpacity, TextInput, StyleSheet} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../../contexts/AuthContext';

import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {StackPramsList} from '../../routes/app.routes'

export default function Dashboard() {
    const navigation = useNavigation<NativeStackNavigationProp<StackPramsList>>();

    const [number, setNumber] = useState('');

    async function openOrder(){
        if(number === ''){
            return;
        }

        navigation.navigate('Order', {number: number, order_id: 'a7d6a532-7484-4a11-9379-817cb5c69f00'});
    }
    
    return(
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Novo pedido</Text>    

            <TextInput 
                placeholder="Id do cliente"
                placeholderTextColor='#f0f0f0'
                style={styles.input}
                keyboardType='numeric'
                value={number}
                onChangeText={setNumber}
            />       

            <TouchableOpacity style={styles.button} onPress={openOrder}>
                <Text style={styles.buttonText}>
                    Iniciar pedido
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 15,
        backgroundColor:'#1d1d2e',
    },

    title:{
        fontSize: 40,
        height: 60,
        color: '#fff',
        marginBottom: 24
    },

    input:{
        width: '90%',
        height: 60,
        backgroundColor: '#101026',
        borderRadius: 4,
        paddingHorizontal: 8,
        textAlign: 'center',
        fontSize: 18,
        color: '#fff',
    },

    button:{
        width: '90%',
        height: 40,
        backgroundColor: '#3fffa3',
        borderRadius: 4,
        marginVertical: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonText:{
        fontSize: 18,
        color: '#101026',
    }

})