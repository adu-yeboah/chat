import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/home/homeScreen';
import AddScreen from '../screens/add/addScreen';
import UserScreen from '../screens/user/userScreen';

import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';

export default function TabNavigation() {
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarHideOnKeyboard: true,
                tabBarStyle: {
                    elevation: 0,
                    height: 70,
                    paddingBottom: 10,
                },
                tabBarItemStyle: {
                    paddingVertical: 5,
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                },
                tabBarActiveTintColor: "#177E89",
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarLabel: "Home",
                    tabBarLabelStyle: {
                        fontSize: 11,
                    },
                    tabBarIcon: ({ color, size, focused }) =>
                        focused ? (
                            <AntDesign name="home" size={size} color={color} />
                        ) : (
                            <AntDesign name="home" size={size} color={color} />
                        ),
                }}
            />

            <Tab.Screen
                name="Home"
                component={AddScreen}
                options={{
                    tabBarLabel: "Add",
                    tabBarLabelStyle: {
                        fontSize: 11,
                    },
                    tabBarIcon: ({ color, size, focused }) =>
                        focused ? (
                            <Entypo name="plus" size={size + 1} color={color} />
                        ) : (
                            <Entypo name="plus" size={size} color={color} />
                        ),
                }}
            /><Tab.Screen
                name="User"
                component={UserScreen}
                options={{
                    tabBarLabel: "User",
                    tabBarLabelStyle: {
                        fontSize: 11,
                    },
                    tabBarIcon: ({ color, size, focused }) =>
                        focused ? (
                            <AntDesign name="user" size={size + 1} color={color} />
                        ) : (
                            <AntDesign name="user" size={size} color={color} />
                        ),
                }}
            />
        </Tab.Navigator>
    )
}