import React, { useEffect, useState, useRef } from "react";
import { View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Camera } from "expo-camera";
import { FontAwesome } from "@expo/vector-icons";
import { commonStyles, darkStyles, lightStyles } from "../styles/commonStyles";
import { useDispatch, useSelector } from "react-redux";
import { uploadPicAction } from "../redux/ducks/accountPrefs";

export default function CameraScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(false);
  const isDarkMode = useSelector((state) => state.prefs.darkMode);
  const cameraRef = useRef(null);
  const dispatch = useDispatch();

  const [back, setBack] = useState(true);

  const styles = {
    ...commonStyles,
    ...(isDarkMode ? darkStyles : lightStyles),
  };

  async function showCamera() {
    try {
      const { granted } = await Camera.requestPermissionsAsync();
      console.log(granted);
      setHasPermission(granted);
      if (granted === false) {
        Alert.alert(
          "Permission Denied",
          "You have denied camera access. Please go to settings and turn on the camera permission."
        );
      }
    } catch (e) {
      console.log(e);
    }
  }

  function flip() {
    setBack(!back);
  }
  async function takePicture() {
    const photo = await cameraRef.current.takePictureAsync();
    console.log(photo);
    dispatch({ ...dispatch(uploadPicAction()), payload: photo });
    navigation.navigate("Account");
  }

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => flip()}
          style={[lightStyles.button, { marginRight: 10 }]}
        >
          <FontAwesome name="camera" size={30} />
        </TouchableOpacity>
      ),
    });
  });

  useEffect(() => {
    showCamera();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Camera
        style={additionalStyles.camera}
        type={back ? Camera.Constants.Type.back : Camera.Constants.Type.front}
        ref={cameraRef}
        onMountError={(e) => Alert.alert("Error: " + e.message)}
      >
        <View style={additionalStyles.innerView}>
          <View style={additionalStyles.buttonView}>
            <TouchableOpacity
              onPress={() => takePicture()}
              style={[
                additionalStyles.circleButton,
                {
                  backgroundColor: "white",
                  justifyContent: "center",
                  alignItems: "center",
                },
              ]}
            >
              <FontAwesome name="camera" size={30} />
            </TouchableOpacity>
          </View>
        </View>
      </Camera>
    </View>
  );
}

const additionalStyles = StyleSheet.create({
  camera: {
    flex: 1,
  },
  circle: {
    height: 50,
    width: 50,
    borderRadius: 50,
  },
  circleButton: {
    width: 70,
    height: 70,
    bottom: 0,
    borderRadius: 50,
  },
  buttonView: {
    alignSelf: "center",
    flex: 1,
    alignItems: "center",
  },
  innerView: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    padding: 20,
    justifyContent: "space-between",
  },
});
