// src/screens/Room.jsx
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import PixelButton2 from "../components/ButtonNext";

const Room = () => {
  const [roomCode, setRoomCode] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter the room code</Text>
      <TextInput
        style={styles.input}
        placeholder="Room code"
        value={roomCode}
        onChangeText={setRoomCode}
      />
      <PixelButton2 title={"WaitingRoom"} roomCode={roomCode}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
    fontFamily: "Minecraft-Regular",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
});

export default Room;
