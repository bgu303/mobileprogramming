import { StyleSheet, Text, TextInput, View, Button, Alert } from 'react-native';
import React, { useEffect, useState } from 'react'

export default function GuessingGame() {

    const [guessText, setGuessText] = useState();
    const [guessNumber, setGuessNumber] = useState();
    const [randomNum, setRandomNum] = useState();
    const [guessCount, setGuessCount] = useState(1);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        setGuessCount(0)
        setRefresh(false)
        setRandomNum(Math.floor(Math.random() * 100) + 1)
        setGuessText("Guess a number between 1-100")
    }, [refresh])

    const buttonGuess = () => {
        if (randomNum > guessNumber) {
            setGuessText(`Your guess ${guessNumber} is too small!`)
            setGuessCount(prev => prev + 1)
            console.log(guessCount)
        } else if (randomNum < guessNumber) {
            setGuessText(`Your guess ${guessNumber} is too high!`)
            setGuessCount(prev => prev + 1)
        } else if (randomNum == guessNumber) {
            Alert.alert('', `You guessed the number in ${guessCount + 1} tries!`,
                [{
                    text: 'OK', onPress: () => setRefresh(true)
                }]);
        }
    }

    return (
        <View style={styles.container}>
            <Text>{guessText}</Text>
            <TextInput keyboardType='numeric' onChangeText={text => setGuessNumber(text)}
                style={{ width: 200, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }} />
            <Button title="GUESS!" onPress={buttonGuess}></Button>
            <Text>Guesscount: {guessCount}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});