import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View } from 'react-native';
import BlogStack from './BlogStack';
import AccountStack from './AccountStack';
import { FontAwesome } from '@expo/vector-icons'; 

const Tab = createBottomTabNavigator();

export default function LoggedInStack() {
  
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>
        First Tab: BlogStack,
        Second Tab: AccountStack
      </Text>
    </View>
  )
}