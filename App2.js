import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, Alert } from 'react-native';
import React, { useState, useEffect } from "react";

export default function App() {
  
  const [text, setText] = useState("");
  const [showText, setShowText] = useState(false);

  const onChangeText = (input) => {
    setShowText(false)
    setText(input)
  }

  const buttonFunc = () => {
    setShowText(true);
  }

  return (
    <View style={styles.container}>
      <View>
        <Text>
          Hello world!
        </Text>
      </View>
      <TextInput style={{width: 200, borderColor: 'gray', borderWidth: 1, marginBottom: 10}}
      onChangeText={onChangeText}
      value={text}/>
      <Button onPress={buttonFunc} title="Testi"></Button>
      {showText &&
      <Text>{text}</Text>}
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
