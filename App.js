import { StyleSheet, Text, View, Button, TextInput, Alert } from 'react-native';
import React, { useState, useEffect } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from'@react-navigation/native-stack';
import Ionicons from '@expo/vector-icons/Ionicons';
import CalculatorHome from './components/CalculatorHome';
import CalculatorHistory from './components/CalculatorHistory';

const Stack = createNativeStackNavigator();

export default function App() {

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Calculator" component={CalculatorHome}></Stack.Screen>
                <Stack.Screen name="History" component={CalculatorHistory}></Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
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