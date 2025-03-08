import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import TabNavigation from './tabRoute'
import RegisterScreen from '../screens/Auth/registerScreen'
import LoginScreen from '../screens/Auth/loginScreen'

export default function MainNavigation() {
    const Screen = createStackNavigator()
  return (
    <Screen.Navigator>
        <Screen.Screen name='Root' component={TabNavigation}/>
        <Screen.Screen name='Register' component={RegisterScreen} />
        <Screen.Screen name='Login' component={LoginScreen} />

    </Screen.Navigator>
  )
}