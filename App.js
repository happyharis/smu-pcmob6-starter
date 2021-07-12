import React, { useState, useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SignInSignUpScreen from "./screens/SignInSignUpScreen";
import TabStack from "./components/TabStack";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./redux/createStore";
import { signInAction, signOutAction } from "./redux/ducks/blogAuth";

const Stack = createStackNavigator();

export default function AppWrapper() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

function App() {
  const [loading, setLoading] = useState(true);
  const signedIn = useSelector((state) => state.auth.signedIn);

  const dispatch = useDispatch();

  async function loadToken() {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      dispatch(signInAction());
    }
    setLoading(false);
  }

  useEffect(() => {
    loadToken();
  }, []);

  if (loading)
    <View style={styles.container}>
      <ActivityIndicator />
    </View>;

  return (
    <NavigationContainer>
      {signedIn ? (
        <TabStack />
      ) : (
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
      )}
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
