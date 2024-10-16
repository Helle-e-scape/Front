// src/screens/Login.jsx
import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  Text,
} from "react-native";

const Login = ({ navigation }) => {
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
      source={require("../assets/background.jpeg")}
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.topSection}>
          <Image
            source={require("../assets/title.png")}
            style={styles.titleImage}
          />
        </View>
        <View style={styles.bottomSection}>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            placeholderTextColor="#888"
            value={name}
            returnKeyType="go"
            onChangeText={setName}
          />
          <TouchableOpacity style={styles.joinButton} onPress={handleJoinRoom}>
            <Text style={styles.joinButtonText}>Join a room</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
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
    marginTop: "10%", // Ajuste la position de l'image au 1/3 de l'écran
  },
  bottomSection: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingBottom: "10%", // Pousse l'input et le bouton vers le bas
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
    backgroundColor: "#fff", // Fond blanc pour l'input
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
});

export default Login;
