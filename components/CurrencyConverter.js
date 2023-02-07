import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { API_TOKEN } from '@env'

export default function CurrencyExchange() {

    const [amount, setAmount] = useState()
    const [symbols, setSymbols] = useState([])
    const [selectedSymbol, setSelectedSymbol] = useState();
    const [result, setResult] = useState("")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        fetch("https://api.apilayer.com/exchangerates_data/symbols", {
            headers: {
                "apikey": `${API_TOKEN}`
            }
        })
            .then(response => response.json())
            .then(result => {
                setSymbols(Object.keys(result.symbols))
                setLoading(false)
            })
            .catch(error => console.log('error', error));
    }, [])

    const fetchData = () => {
        setLoading(true)
        fetch(`https://api.apilayer.com/exchangerates_data/convert?to=EUR&from=${selectedSymbol}&amount=${amount}`, {
            headers: {
                "apikey": `${API_TOKEN}`
            }
        })
            .then(response => response.json())
            .then(result => {
                setResult(`Converted to Euros: ${result.result.toFixed(2)}`)
                setLoading(false)
            })
            .catch(error => console.log('error', error));
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 80 }}>
            <ActivityIndicator size="small" animating={loading}/>
            <Text style={{fontSize: 20}}>{result}</Text>
            <TextInput
                style={{ width: 150, borderColor: 'gray', borderWidth: 1, marginBottom: 15 }}
                value={amount}
                onChangeText={text => setAmount(text)}
            />
            <View style={{flexDirection: 'row'}}>
                <Button title="convert to euros" onPress={fetchData}></Button>
                <Picker style={{width: 70}}
                    selectedValue={selectedSymbol}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedSymbol(itemValue)
                    }>
                    {symbols.map((symbols, index) => (
                        <Picker.Item
                            label={symbols}
                            value={symbols}
                            key={index}
                        />
                    ))}
                </Picker>
            </View>
        </View>
    )
}

