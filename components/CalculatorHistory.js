import { View, Text, FlatList } from 'react-native';
import { useEffect, useState } from 'react';

export default function CalculatorHistory( { route } ) {

    const { data } = route.params
    
    return (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ alignItems: 'center' }}>
                <FlatList
                    data={data}
                    renderItem={({ item }) => <Text>{item.key}</Text>}
                    contentContainerStyle={{ alignSelf: 'center' }}
                />
            </View>
        </View>
    )
}