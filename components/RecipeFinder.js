import React, { useState } from 'react';
import { View, Text, Button, TextInput, FlatList, Image } from 'react-native';

export default function RecipeFinder() {

    const [recipe, setRecipe] = useState("")
    const [recipes, setRecipes] = useState([])

    const searchRecipe = () => {
        fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${recipe}`)
            .then(response => response.json())
            .then(data => setRecipes(data.meals))
    }

    const itemSeparator = () => {
        return(
            <View style={{height: 1, backgroundColor: 'gray'}}></View>
        )
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 80 }}>
            <TextInput
                value={recipe}
                onChangeText={text => setRecipe(text)}
                style={{ width: 150, borderColor: 'gray', borderWidth: 1, marginBottom: 15 }}
            />
            <Button title="search" onPress={searchRecipe}></Button>
            <FlatList
                data={recipes}
                ItemSeparatorComponent={itemSeparator}
                renderItem={({ item }) =>
                    <View>
                        <Text>{item.strMeal}</Text>
                        <Image style={{width: 50, height: 50}}
                        source={{uri: item.strMealThumb}}/>
                    </View>
                }
            />
        </View>
    )
}