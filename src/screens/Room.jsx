// src/screens/Room.jsx
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

const Room = () => {
  const [roomCode, setRoomCode] = useState("");
  const navigation = useNavigation();

  const handleJoinGame = () => {
    if (roomCode.trim()) {
      alert(`Joining room with code: ${roomCode}`);
      navigation.navigate("Waiting Room");
      // Ici, on pourrait ajouter la logique pour rejoindre la salle
    } else {
      alert("Please enter the room code");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter the room code</Text>
      <TextInput
        style={styles.input}
        placeholder="Room code"
        value={roomCode}
        onChangeText={setRoomCode}
      />
      <Button title="Join the game" onPress={handleJoinGame} />
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
