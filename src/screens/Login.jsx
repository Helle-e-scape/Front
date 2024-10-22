// src/screens/Login.jsx
import React, { useState } from "react";
import PixelButton from "../components/Button";
import {
  View,
  TextInput,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  Text, // Import du composant Text de base au cas où
} from "react-native";
import { useUser } from "../context/UserContext";
import { authApi } from "../_api/user.api";

const Login = ({ navigation, route }) => {
  const { CustomText, CustomTextInput } = route.params; // Assurez-vous que CustomText et CustomTextInput sont bien des composants
  const [name, setName] = useState("");
  const { setUser } = useUser();

  const handleJoinRoom = () => {
    if (name.trim()) {
      authApi.creatUser(name.trim())
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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1 }}>
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
                onSubmitEditing={handleJoinRoom}
          />
              <TouchableOpacity
                style={styles.joinButton}
                onPress={handleJoinRoom}
              >
                <CustomText style={styles.joinButtonText}>
                  {/* Assurez-vous que tout texte est bien rendu dans un composant Text */}
                  Join a room
                </CustomText>
              </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
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
