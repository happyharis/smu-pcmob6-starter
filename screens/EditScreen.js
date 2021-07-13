import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import axios from "axios";

import { useSelector } from "react-redux";
import { commonStyles, lightStyles } from "../styles/commonStyles";
import { API_POSTS, API } from "../constants/API";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function EditScreen({ navigation, route }) {
  const styles = { ...lightStyles, ...commonStyles };

  const [title, setTitle] = useState(route.params.post.title);
  const [content, setContent] = useState(route.params.post.content);
  const id = route.params.post.id;

  async function savePost() {
    const post = { title, content };
    const token = await AsyncStorage.getItem("token");

    try {
      await axios.put(API + API_POSTS + "/" + id, post, {
        headers: { Authorization: `JWT ${token}` },
      });

      navigation.navigate("Index", { post: post });
      return "completed";
    } catch (error) {
      console.log(error.response.data);
      if ((error.response.data.error = "Invalid token")) {
        navigation.navigate("SignInSignUp");
      }
    }
  }

  useEffect(() => {
    console.log(route.params.post);
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ margin: 20 }}>
        <Text style={[styles.text, styles.title, { marginTop: 20 }]}>
          Edit Screen
        </Text>
        <Text style={[additionalStyles.label, styles.text]}>Title</Text>
        <TextInput
          style={additionalStyles.input}
          value={title}
          onChangeText={setTitle}
        />
        <Text style={[additionalStyles.label, styles.text]}>Content</Text>
        <TextInput
          style={additionalStyles.input}
          value={content}
          onChangeText={setContent}
        />
        <TouchableOpacity style={styles.button} onPress={savePost}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const additionalStyles = StyleSheet.create({
  input: {
    fontSize: 24,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 15,
  },
  label: {
    fontSize: 28,
    marginBottom: 10,
    marginLeft: 5,
  },
});
