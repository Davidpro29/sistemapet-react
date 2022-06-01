
import React, {useState} from 'react';
import {View,
  Text, 
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList
} from 'react-native';

import {FontAwesome} from '@expo/vector-icons';
import Tarefa from './src/Tarefa';

export default function App(){

  const [tarefa, setTarefa] = useState('')
  const [list, setList] = useState([])

  
  function handleAdd(){
    if(tarefa === ''){
      return;
    }

    let dados ={
      key: Date.now(),
      item: tarefa
    }

    setList(oldArray => [dados, ...oldArray]);
    setTarefa('')
  }

  function handleDelete(item){
    let filtroItem = list.filter((tarefa) => {
      return (tarefa.item !== item)
    })

    setList(filtroItem)
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tarefas com React Native</Text>

        <View style={styles.containerInput}>
        <TextInput 
          placeholder='Digite sua tarefa diária'
          style={styles.input}
          value={tarefa}
          onChangeText={(text) => setTarefa(text)}
        />
        <TouchableOpacity style={styles.buttonAdd} onPress={handleAdd}>
          <FontAwesome name="plus" size={20} color="#fff" />
        </TouchableOpacity>

      </View>    
      <FlatList 
        data={list}
        keyExtractor={ (item) => item.key }
        renderItem={ ({item}) => <Tarefa data={item} deleteItem={ () => handleDelete(item.item) } /> }
        style={styles.list}
      />  
    </View>
    
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#22272e',
    paddingTop: 40,
  },

  title:{
    fontWeight: 'bold',
    fontSize: 24,
    color: '#fff',
    marginTop: '5%',
    marginBotton: '10',
    paddingStart: '5%',
  },

  containerInput:{
    flexDirection: 'row',
    width: '100%',
    height: 44,
    alignItems: 'center',
    marginBottom: 20,
  },

  input:{
    width: '75%',
    backgroundColor: '#fbfbfb',
    height: 38,
    borderRadius: 4,
    paddingHorizontal: 10,
    marginLeft: 10,
    marginRight: 10,
  },

  buttonAdd :{
    width: '15%',
    height: 38,
    backgroundColor: '#73f7ff',
    alignItems: 'center',
    justifyContent:'center', 
    borderRadius: 4,
  },

  list:{
    flex: 1,
    paddingStart: '5%',
    paddingEnd: '5%',
    backgroundColor: '#fff',
  }
  
 
})