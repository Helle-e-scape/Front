// src/screens/Login.jsx
import React, { useState } from "react";
import { View, Image, ImageBackground, TouchableOpacity } from "react-native";

const Login = ({ navigation, route }) => {
  const { CustomText, CustomTextInput } = route.params;
  const [name, setName] = useState("");

  const handleJoinRoom = () => {
    if (name.trim()) {
      navigation.navigate("Room");
    } else {
      alert("Please enter your name");
    }
  };

  return (
    <ImageBackground
      source={require("../assets/images/background.jpeg")}
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.topSection}>
          <Image
            source={require("../assets/images/title.png")}
            style={styles.titleImage}
          />
        </View>
        <View style={styles.bottomSection}>
          <CustomTextInput
            style={styles.input}
            placeholder="Enter your name"
            placeholderTextColor="#888"
            value={name}
            returnKeyType="go"
            onChangeText={setName}
          />
          <TouchableOpacity style={styles.joinButton} onPress={handleJoinRoom}>
            <CustomText style={styles.joinButtonText}>Join a room</CustomText>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = {
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  topSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: "10%",
  },
  bottomSection: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingBottom: "10%",
  },
  titleImage: {
    width: 200,
    height: 100,
    resizeMode: "contain",
  },
  input: {
    width: "80%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    backgroundColor: "#fff",
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  joinButton: {
    marginTop: 20,
    backgroundColor: "#6200ea",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    alignItems: "center",
  },
  joinButtonText: {
    color: "#fff",
    fontSize: 16,
  },
};

export default Login;
