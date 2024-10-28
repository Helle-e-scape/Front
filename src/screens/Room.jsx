// src/screens/Room.jsx
import React, { useState, useEffect } from "react";
import { View, Text, TextInput,TouchableOpacity, StyleSheet, ImageBackground } from "react-native";
import PixelButton2 from "../components/ButtonNext";
import InputPerso from "../components/Input";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Room = () => {
  const [roomCode, setRoomCode] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    // Désactiver le geste de retour et masquer le bouton de retour
    navigation.setOptions({
      gestureEnabled: false, // Désactiver le swipe-back
      headerLeft: () => null, // Supprimer le bouton de retour
    });
  }, [navigation]);

  const handleInputRoom = (text) => {
    setRoomCode(text);
  }

  return (
    <ImageBackground 
    source={require("../assets/images/background.jpeg")}
    style={styles.background}>
      <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
          </TouchableOpacity>
    <View style={styles.container}>
      <Text style={styles.label}>Room Portal</Text>
      <View style={styles.input}>
      <InputPerso placeholder={"Enter your room code"} onInputChange={handleInputRoom}/>
      </View>
      <View style={styles.input}>
      <PixelButton2 title={"WaitingRoom"} roomCode={roomCode}/>
      </View>
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },         
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  label: {
    fontSize: 30,
    marginBottom: '25%',
    textAlign: "center",
    fontFamily: "Minecraft-Regular",
    color: 'white',
  },
  input: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    position: "absolute",
    top: 50, // Ajuster la position de la flèche
    left: 20,
    zIndex: 1,
  },
});

export default Room;
  
