// src/screens/Room.jsx
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
import { Ionicons } from "@expo/vector-icons"; // Ajout d'une icône pour la flèche retour
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

const Room = () => {
  const [roomCode, setRoomCode] = useState("");
  const navigation = useNavigation(); // Utilisation de la navigation pour le retour

  const handleJoinGame = () => {
    if (roomCode.trim()) {
      // Navigation vers WaitingRoom au lieu de l'alerte
      navigation.navigate("WaitingRoom");
    } else {
      alert("Please enter the room code");
    }
  };

  return (
    <ImageBackground
      source={require("../assets/background.jpeg")}
      style={styles.background}
    >
      <SafeAreaView style={styles.container}>
        {/* Bouton de retour avec flèche */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>

        <View style={styles.topSection}>
          <Image
            source={require("../assets/title.png")}
            style={styles.titleImage}
          />
        </View>
        <View style={styles.bottomSection}>
          <TextInput
            style={styles.input}
            placeholder="Enter the room code" // Remplacement du label par un placeholder
            placeholderTextColor="#888"
            value={roomCode}
            returnKeyType="go"
            onChangeText={setRoomCode}
          />
          <TouchableOpacity style={styles.joinButton} onPress={handleJoinGame}>
            <Text style={styles.joinButtonText}>Join the game</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
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
    marginTop: "10%", // Positionne l'image au 1/3 de l'écran
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
  backButton: {
    position: "absolute",
    top: 50, // Ajuste la position du bouton de retour
    left: 20,
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

export default Room;
