import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";
import AccountStack from "./AccountStack";
import BlogStack from "./BlogStack";

const Tab = createBottomTabNavigator();

export default function TabStack() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Blog" component={BlogStack} />
      <Tab.Screen name="Account" component={AccountStack} />
    </Tab.Navigator>
  );
}
