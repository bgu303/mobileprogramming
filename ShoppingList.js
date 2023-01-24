import { StyleSheet, Text, TextInput, View, Button, FlatList } from 'react-native';
import React, { useState } from 'react'

export default function Calculator() {
  
    const [shoppingListItem, setShoppingListItem] = useState("")
    const [shoppingList, setShoppingList] = useState([])

    const addToList = () => {
        setShoppingList([...shoppingList, shoppingListItem])
        setShoppingListItem("")
    }

    const clearList = () => {
        setShoppingList([])
    }

  return (
    <View style={styles.container}>
      <TextInput
      onChangeText={text => setShoppingListItem(text)}
      value={shoppingListItem}
      style={{ width: 200, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}></TextInput>
      <View style={{flexDirection: 'row'}}>
        <Button title="ADD" onPress={addToList}></Button>
        <Button title="CLEAR" onPress={clearList}></Button>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'center'}}>
        <FlatList
        data={shoppingList}
        renderItem={({item}) => <Text>{item}</Text>}
        contentContainerStyle={{ alignSelf: 'center' }}
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
  }
});