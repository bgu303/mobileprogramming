import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, ActivityIndicator } from 'react-native';

export default function GithubRepo() {
    const [data, setData] = useState([]);
    const [keyword, setKeyWord] = useState("")
    const [loading, setLoading] = useState(false)

    const fetchRepos = () => {
        setLoading(true)
        fetch(`https://api.github.com/search/repositories?q=${keyword}`)
            .then(response => response.json())
            .then(data => {
                setData(data.items)
                setLoading(false)
            })
            .catch(err => console.log(err))
    }

    const itemSeparator = () => {
        return(
            <View style={{height: 1, backgroundColor: 'gray'}}></View>
        )
    }

    return (
        <View style={{marginTop: 80, marginLeft: 10, marginRight: 10}}>
            <TextInput
                value={keyword}
                onChangeText={text => setKeyWord(text)}
                style={{width: 300, borderColor: 'gray', borderWidth: 1, marginBottom: 15}}/>
            <Button title="search" onPress={fetchRepos}></Button>
            <ActivityIndicator size="large" animating={loading}/>
            <FlatList
            data={data}
            ItemSeparatorComponent={itemSeparator}
            renderItem={({item}) =>
                <View>
                    <Text style={{fontSize: 15, fontWeight: 'bold'}}>{item.full_name}</Text>
                    <Text>{item.description}</Text>
                </View>}
            />
        </View>
    );

}