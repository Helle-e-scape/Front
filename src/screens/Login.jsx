// src/screens/Login.jsx
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

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
    <View style={styles.container}>
      <Text style={styles.label}>Enter your name</Text>
      <TextInput
        style={styles.input}
        placeholder="Your name"
        value={name}
        onChangeText={setName}
      />
      <Button title="Join a room" onPress={handleJoinRoom} />
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

export default Login;
