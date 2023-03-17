import { StyleSheet, View, Text, Button, FlatList } from 'react-native';
import * as Contacts from 'expo-contacts';
import React, { useState } from "react";

export default function ContactList() {

    const [contact, setContact] = useState({})

    const getContacts = async () => {
        const { status } = await Contacts.requestPermissionsAsync();
        if (status === 'granted') {
            const { data } = await Contacts.getContactsAsync(
                { fields: [Contacts.Fields.PhoneNumbers] }
            )
            if (data.length > 0) {
                setContact(data)
            }
        }
    }

    return (
        <View style={styles.container}>
            <View>
                <FlatList
                data={contact}
                renderItem={({item}) =><Text>{item.name} {item.phoneNumbers[0].number}</Text>}
                contentContainerStyle={{ alignSelf: 'center' }}
                />
            </View>
            <View>
            <Button title="Get Contacts" onPress={getContacts} />
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
        paddingBottom: 50
    },
});