// src/screens/Room.jsx
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, ImageBackground } from "react-native";
import PixelButton2 from "../components/ButtonNext";
import InputPerso from "../components/Input";

const Room = () => {
  const [roomCode, setRoomCode] = useState("");

  const handleInputRoom = (text) => {
    setRoomCode(text);
  }

  return (
    <ImageBackground 
    source={require("../assets/images/background.jpeg")}
    style={styles.background}>
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
});

export default Room;
