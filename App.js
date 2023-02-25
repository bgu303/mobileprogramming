import { AsyncStorage } from '@react-native-async-storage/async-storage';
import * as SQLite from 'expo-sqlite';
import { StyleSheet, Text, TextInput, View, Button, FlatList } from 'react-native';
import React, { useState, useEffect } from "react";


export default function CourseList() {

    const db = SQLite.openDatabase('coursedb.db');
    const [credit, setCredit] = useState("");
    const [title, setTitle] = useState("");
    const [courses, setCourses] = useState("");

    useEffect(() => {
        db.transaction(tx => {
            tx.executeSql('CREATE TABLE IF NOT EXISTS Course (id INTEGER PRIMARY KEY NOT NULL, credits INT, title TEXT);');
        }, null, updateList)
    }, [])

    const saveItem = () => {
        db.transaction(tx => {
            tx.executeSql('INSERT INTO Course (credits, title) VALUES (?, ?);',
                [parseInt(credit), title]);
        }, null, updateList)
    }

    const updateList = () => {
        db.transaction(tx => {
            tx.executeSql('select * from course;', [], (_, { rows }) =>
                setCourses(rows._array)
            );
        }, null, null);
    }

    const deleteItem = (id) => {
        db.transaction(tx => {
            tx.executeSql('DELETE FROM Course WHERE id = ?;', [id])
        }, null, updateList)
    }


    return (
        <View style={styles.container}>
            <View>
                <TextInput
                    style={{ width: 150, borderColor: 'gray', borderWidth: 1, marginBottom: 20 }}
                    placeholder='Title'
                    onChangeText={title => setTitle(title)} />
                <TextInput
                    style={{ width: 150, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
                    placeholder='Credits'
                    onChangeText={credit => setCredit(credit)} />
            </View>
            <Button onPress={saveItem} title='Save' />
            <View>
                <FlatList
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) =>
                        <View>
                            <Text>{item.title},{item.credits} </Text>
                            <Text style={{ color: '#0000ff' }} onPress={() => deleteItem(item.id)}>done</Text>
                        </View>}
                    data={courses}
                />
            </View>
        </View>
    );
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