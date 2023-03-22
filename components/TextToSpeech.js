import * as React from 'react';
import { View, StyleSheet, Button, TextInput } from 'react-native';
import * as Speech from 'expo-speech';
import { useState } from 'react';

export default function App() {

    const [text, setText] = useState();

    const speak = () => {
        const thingToSay = text;
        Speech.speak(thingToSay);
    };

    return (
        <View style={styles.container}>
            <TextInput onChangeText={value => setText(value)} style={{ borderColor: 'black', borderWidth: 1, width: 150 }}></TextInput>
            <Button title="Talk to me daddy" onPress={speak} />
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
        paddingBottom: 50
    },
});