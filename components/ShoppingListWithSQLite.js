import { StyleSheet, View, Text, TextInput, Button, Alert, FlatList } from 'react-native';
import React, { useState, useEffect, useRef } from "react";
import { AsyncStorage } from '@react-native-async-storage/async-storage';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('ShoppingList.db')

export default function App() {

    const [item, setItem] = useState('');
    const [amount, setAmount] = useState('');
    const [shoppingList, setShoppingList] = useState([])

    useEffect(() => {
        db.transaction((tx) => {
            tx.executeSql('CREATE TABLE IF NOT EXISTS ShoppingList (id INTEGER PRIMARY KEY NOT NULL, item TEXT, amount TEXT);');
        }, fetchListError, updateList);
    }, [])

    const fetchListError = () => {
        Alert.alert('Fetching error', 'Something went wrong with fetching the list!')
    }

    const saveError = () => {
        Alert.alert('Saving error', 'Something went wrong saving an item!')
    }

    const deleteError = () => {
        Alert.alert('Deleting error', 'Something went wrong deleting an item!')
    }

    const saveItem = () => {
        db.transaction(tx => {
            tx.executeSql('INSERT INTO ShoppingList (item, amount) VALUES (?, ?);',
                [item, amount]);
        }, saveError, updateList)
        setAmount("")
        setItem("")
    }

    const deleteItem = (id) => {
        db.transaction(tx => {
            tx.executeSql('DELETE FROM ShoppingList WHERE id = ?;',
            [id]);
        }, deleteError, updateList)
    }

    const updateList = () => {
        db.transaction(tx => {
            tx.executeSql('SELECT * FROM ShoppingList;', [], (_, { rows }) =>
                setShoppingList(rows._array)
            );
        }, fetchListError, updateList)
    }

    return (
        <View style={styles.container}>
            <TextInput style={{ width: 150, borderColor: 'gray', borderWidth: 1 }}
                placeholder='Shopping item'
                onChangeText={item => setItem(item)}
                value={item} />
            <TextInput style={{ width: 150, borderColor: 'gray', borderWidth: 1, marginBottom: 20 }}
                placeholder='Amount'
                onChangeText={amount => setAmount(amount)}
                value={amount} />
            <Button onPress={saveItem} title="Save" />
            <View>
                {shoppingList.length > 0 &&
                <Text style={{fontSize: 20}}>Shoppinglist</Text>}
                <FlatList
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) =>
                        <View style={{ flex: 1, flexDirection: "row" }}>
                            <Text>{item.item}, {item.amount}</Text>
                            <Text onPress={() => deleteItem(item.id)} style={{ marginLeft: 20, color: 'red' }}>Delete</Text>
                        </View>
                    }
                    data={shoppingList}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 150,
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});