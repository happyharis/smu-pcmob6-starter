import React, { useState, useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SignInSignUpScreen from "./screens/SignInSignUpScreen";
import TabStack from "./components/TabStack";

const Stack = createStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [signedIn, setSignedIn] = useState(false);

  async function loadToken() {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      setSignedIn(true);
    }
    setLoading(false);
  }

  useEffect(() => {
    loadToken();
  }, []);

  return loading ? (
    <View style={styles.container}>
      <ActivityIndicator />
    </View>
  ) : !signedIn ? (
    <NavigationContainer>
      <Stack.Navigator
        mode="modal"
        headerMode="none"
        initialRouteName="SignInSignUp"
      >
        <Stack.Screen
          component={SignInSignUpScreen}
          name="SignInSignUp"
          options={{ animationEnabled: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  ) : (
    <NavigationContainer>
      <TabStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
