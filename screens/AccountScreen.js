import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { API, API_WHOAMI } from "../constants/API";
import { toggleDarkMode } from "../redux/ducks/accountPrefs";
import { signOutAction } from "../redux/ducks/blogAuth";
import { lightStyles } from "../styles/commonStyles";

export default function AccountScreen({ navigation }) {
  const [username, setUsername] = useState(null);
  const isDarkMode = useSelector((state) => state.prefs.darkMode);
  const dispatch = useDispatch();

  const styles = lightStyles;

  async function getUsername() {
    console.log("---- Getting user name ----");
    const token = await AsyncStorage.getItem("token");
    console.log(`Token is ${token}`);
    try {
      const response = await axios.get(API + API_WHOAMI, {
        headers: { Authorization: `JWT ${token}` },
      });
      console.log("Got user name!");
      setUsername(response.data.username);
    } catch (error) {
      console.log("Error getting user name");
      if (error.response) {
        console.log(error.response.data);
        if (error.response.data.status_code === 401) {
          signOut();
          navigation.navigate("SignInSignUp");
        }
      } else {
        console.log(error);
      }
      // We should probably go back to the login screen???
    }
  }

  function signOut() {
    AsyncStorage.removeItem("token");
    dispatch(signOutAction());
  }

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={signOut}>
          <FontAwesome
            name="sign-out"
            size={24}
            style={{ color: styles.headerTint, marginRight: 15 }}
          />
        </TouchableOpacity>
      ),
    });
    console.log("Setting up nav listener");
    // Check for when we come back to this screen
    const removeListener = navigation.addListener("focus", () => {
      console.log("Running nav listener");
      setUsername(<ActivityIndicator />);
      getUsername();
    });
    getUsername();
    return removeListener;
  }, []);

  return (
    <View style={[styles.container, { alignItems: "center" }]}>
      <Text style={{ marginTop: 20 }}>Account Screen</Text>

      <Text>{username}</Text>
      <View>
        <Text>Dark Mode</Text>
        <Switch
          value={isDarkMode}
          onValueChange={() => dispatch(toggleDarkMode())}
        />
      </View>
      <Text>{isDarkMode ? "Dark mode ON" : "Dark mode OFF"}</Text>
    </View>
  );
}
