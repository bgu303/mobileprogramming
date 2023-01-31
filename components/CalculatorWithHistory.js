import { StyleSheet, Text, TextInput, View, Button, FlatList, Alert } from 'react-native';
import React, { useState } from 'react'

export default function CalculatorWithHistory() {
  const [result, setResult] = useState()
  const [data, setData] = useState([])
  const [numberOne, setNumberOne] = useState("")
  const [numberTwo, setNumberTwo] = useState("")
  const [historyText, setHistoryText] = useState("")
  let total = Number(numberOne) + Number(numberTwo)
  let totalDec = Number(numberOne) - Number(numberTwo)

  const listSeparator = () => {
    return(
      <View style={{height: 1, backgroundColor: 'black'}}></View>
    )
  }

  const add = () => {
    if (isNaN(numberOne) || isNaN(numberTwo)) {
      Alert.alert("Please give numbers!")
      return;
    }
    setResult("Result: " + total)
    setData([...data, { key: `${numberOne} + ${numberTwo} = ${total}` }])
    setHistoryText("History")
    setNumberOne("")
    setNumberTwo("")
  }

  const decrement = () => {
    if (isNaN(numberOne) || isNaN(numberTwo)) {
      Alert.alert("Please give numbers!")
      return;
    }
    setResult("Result: " + totalDec)
    setData([...data, { key: `${numberOne} - ${numberTwo} = ${totalDec}` }])
    setHistoryText("History")
    setNumberOne("")
    setNumberTwo("")
  }

  return (
    <View style={styles.container}>
      <View>
        <Text>{result}</Text>
        <TextInput keyboardType='numeric' onChangeText={text => setNumberOne(text)} value={numberOne}
          style={{ width: 200, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }} />
        <TextInput keyboardType='numeric' onChangeText={text => setNumberTwo(text)} value={numberTwo}
          style={{ width: 200, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }} />
      </View>
      <View style={{ flexDirection: 'row', width: 150, justifyContent: 'space-around' }}>
        <Button onPress={add} title="+"></Button>
        <Button onPress={decrement} title="-"></Button>
      </View>
      <View style={{alignItems: 'center'}}>
        <Text>{historyText}</Text>
        <FlatList
          data={data}
          ItemSeparatorComponent={listSeparator}
          renderItem={({item}) =><Text>{item.key}</Text>}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ alignSelf: 'center' }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 200,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});