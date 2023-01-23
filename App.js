import { StyleSheet, Text, TextInput, View, Button, FlatList } from 'react-native';
import React, { useState } from 'react'

export default function Calculator() {
  const [result, setResult] = useState()
  const [data, setData] = useState([])
  const [numberOne, setNumberOne] = useState("")
  const [numberTwo, setNumberTwo] = useState("")
  let total = Number(numberOne) + Number(numberTwo)
  let totalDec = Number(numberOne) - Number(numberTwo)

  const add = () => {
    setResult("Result: " + total)
    setData([...data, { key: `${numberOne} + ${numberTwo} = ${total}` }])
  }

  const decrement = () => {
    setResult("Result: " + totalDec)
    setData([...data, { key: `${numberOne} - ${numberTwo} = ${totalDec}` }])
  }

  return (
    <View style={styles.container}>
      <View>
        <Text>{result}</Text>
        <TextInput keyboardType='numeric' onChangeText={text => setNumberOne(text)} value={numberOne}
          style={{ width: 200, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }} />
        <TextInput keyboardType='numeric' onChangeText={text => setNumberTwo(text)}
          style={{ width: 200, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }} />
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Button onPress={add} title="+"></Button>
        <Button onPress={decrement} title="-"></Button>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'center'}}>
        <FlatList
          data={data}
          renderItem={({item}) =><Text>{item.key}</Text>}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});