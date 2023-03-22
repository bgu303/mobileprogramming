import { StyleSheet, View, Text, TextInput, Button, Alert, FlatList } from 'react-native';
import React, { useState, useEffect, useRef } from "react";
import { initializeApp } from 'firebase/app';
import { getDatabase, push, ref, onValue, remove } from 'firebase/database';
import { FIREBASE_API_KEY } from '@env'

const firebaseConfig = {
    apiKey: FIREBASE_API_KEY,
    authDomain: "mobile-programming-stuff.firebaseapp.com",
    databaseURL: "https://mobile-programming-stuff-default-rtdb.europe-west1.firebasedatabase.app/",
    projectId: "mobile-programming-stuff",
    storageBucket: "mobile-programming-stuff.appspot.com",
    messagingSenderId: "733070540878",
    appId: "1:733070540878:web:ddaff0677f398abe2a831f",
    measurementId: "G-V073Q0DF20"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default function App() {

    ref(database, 'ShoppingList/')

    const [item, setItem] = useState('');
    const [amount, setAmount] = useState('');
    const [shoppingList, setShoppingList] = useState([])

    const saveItem = () => {
        if (item.length <= 0 || amount.length <= 0) {
            return;
        }

        push(
            ref(database, 'ShoppingList/'),
            {'item': item, 'amount': amount}
        )
        setAmount("")
        setItem("")
    }

    useEffect(() => {
        const itemsRef = ref(database, 'ShoppingList/');
        onValue(itemsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                let list = Object.values(data);
                list.forEach((item, index) => {
                    item.id = Object.keys(data)[index]
                })
                setShoppingList(list);
            } else {
                setShoppingList([]);
            }
        })
    }, []);

    const deleteItem = (id) => {
        const itemRef = ref(database, 'ShoppingList/' + id);
        remove(itemRef)
          .then((response) => {
            if (response !== null) {
                Alert.alert("Success!", "Successful item deletion!")
            } else {
                Alert.alert("Not Success!", "Something went wrong!")
            }
          })
          .catch((error) => {
            console.error('Error deleting item: ', error);
          });
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
                <FlatList
                    renderItem={({ item }) =>
                        <View style={{ flex: 1, flexDirection: "row" }}>
                            <Text>{item.item}, {item.amount}</Text>
                            <Text onPress={() => deleteItem(item.id)} style={{marginLeft: 20, color: 'red'}}>Delete</Text>
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