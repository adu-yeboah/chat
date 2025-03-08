import React from "react";
import { View, Text, TextInput, FlatList, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const contacts = [
  {
    id: "1",
    name: "Amber Griffin",
    status: "Online",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    online: true,
  },
  {
    id: "2",
    name: "Andreea Wells",
    status: "Online",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
    online: true,
  },
  {
    id: "3",
    name: "Kathryn Hill",
    status: "Last seen 3 minutes ago",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    online: false,
  },
  {
    id: "4",
    name: "Kelly McCoy",
    status: "Last seen 5 minutes ago",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    online: false,
  },
  {
    id: "5",
    name: "Tyler Banks",
    status: "Last seen 7 minutes ago",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
    online: false,
  },
  {
    id: "6",
    name: "Carmen Mendez",
    status: "Last seen 10 minutes ago",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
    online: false,
  },
];

const HomeScreen = () => {
  return (
    <View className="flex-1 bg-gray-100 p-4">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-xl font-bold text-gray-900">Contact</Text>
        <Ionicons name="search" size={24} color="black" />
      </View>

      {/* Contacts List */}
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity className="flex-row items-center p-2 bg-white rounded-lg mb-2 shadow-sm">
            <Image source={{ uri: item.image }} className="w-12 h-12 rounded-full" />
            <View className="ml-4 flex-1">
              <Text className="text-base font-semibold text-gray-900">{item.name}</Text>
              <Text className="text-sm text-gray-500">{item.status}</Text>
            </View>
            {item.online && <View className="w-3 h-3 bg-green-500 rounded-full" />}
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default HomeScreen;
