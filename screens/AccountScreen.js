import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { disableExpoCliLogging } from "expo/build/logs/Logs";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Switch,
  Text,
  TouchableOpacity,
  View,
  Image,
  TouchableWithoutFeedback,
  Animated,
} from "react-native";

import { useDispatch, useSelector } from "react-redux";
import { API, API_WHOAMI } from "../constants/API";
import { resetDarkMode, toggleDarkMode } from "../redux/ducks/accountPrefs";
import { signOutAction } from "../redux/ducks/blogAuth";
import { commonStyles, darkStyles, lightStyles } from "../styles/commonStyles";

export default function AccountScreen({ navigation }) {
  const [username, setUsername] = useState(null);
  const isDarkMode = useSelector((state) => state.prefs.darkMode);
  const profilePicture = useSelector((state) => state.prefs.profilePicture);

  const dispatch = useDispatch();

  const styles = {
    ...commonStyles,
    ...(isDarkMode ? darkStyles : lightStyles),
  };

  const picSize = new Animated.Value(200);

  function changePicSize() {
    Animated.loop(
      Animated.sequence([
        Animated.timing(picSize, {
          toValue: 300,
          duration: 2500,
          useNativeDriver: false,
        }),
        Animated.timing(picSize, {
          toValue: 200,
          duration: 2500,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }

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
    dispatch(resetDarkMode());
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
      <View
        style={{
          height: profilePicture == null ? 0 : 320,
          justifyContent: "center",
        }}
      >
        {profilePicture == null ? (
          <View />
        ) : (
          <TouchableWithoutFeedback onPress={changePicSize}>
            <Animated.Image
              source={{ uri: profilePicture?.uri }}
              style={{ width: picSize, height: picSize, borderRadius: 200 }}
            />
          </TouchableWithoutFeedback>
        )}
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Camera")}
      >
        <Text style={styles.buttonText}>
          {profilePicture == null
            ? "Take a profile picture"
            : "Edit Profile Picture"}
        </Text>
      </TouchableOpacity>

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
