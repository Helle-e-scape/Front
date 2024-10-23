// src/screens/Login.jsx
import React, { useState } from "react";
import PixelButton from "../components/Button";
import InputPerso from "../components/Input";
import {
  View,
  TextInput,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  Text,
  Button,
} from "react-native";
import { useUser } from "../context/UserContext";
import { authApi } from "../_api/user.api";

const Login = ({ navigation }) => {
  const [name, setName] = useState("");
  const { user ,setUser } = useUser();

  const handleInputName = (text) => {
    setName(text);
  }

  const handleJoinRoom = async () => {
    if (name.trim()) {
      await authApi.creatUser(name.trim())
      .then(response => {
        setUser(response.user);  
        navigation.navigate("Room"); 
      })
      .catch(error => {
        console.error("Error during registration: ", error);
      });
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
          <InputPerso placeholder={"Enter your name"} onInputChange={handleInputName} />
          <PixelButton title={"Room"} onPress={handleJoinRoom}/>
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
    backgroundColor: "#fff", // Fond blanc pour l'input
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    fontFamily: "Minecraft",
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
