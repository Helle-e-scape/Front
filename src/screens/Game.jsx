// src/screens/Game.jsx
import React from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Text,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const Game = () => {
  const navigation = useNavigation(); // Utilisation de la navigation

  const handleTrapPress = () => {
    alert("Trap button pressed");
    // Ajouter la logique pour le bouton "Piège" ici si nécessaire
  };

  const handleScoreboardPress = () => {
    // Redirige vers la page Scoreboard
    navigation.navigate("Scoreboard");
  };

  return (
    <ImageBackground
      source={require("../assets/background.jpeg")}
      style={styles.background}
    >
      <View style={styles.container}>
        <TouchableOpacity style={styles.trapButton} onPress={handleTrapPress}>
          <Text style={styles.trapButtonText}>Piège</Text>
        </TouchableOpacity>

        {/* Bouton Scoreboard */}
        <TouchableOpacity
          style={styles.scoreboardButton}
          onPress={handleScoreboardPress}
        >
          <Text style={styles.scoreboardButtonText}>Scoreboard</Text>
        </TouchableOpacity>
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
    justifyContent: "center",
    alignItems: "center",
  },
  trapButton: {
    backgroundColor: "#6200ea",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 20, // Ajoute un espace entre les deux boutons
  },
  trapButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  scoreboardButton: {
    backgroundColor: "#ff5722", // Une autre couleur pour différencier le bouton
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    alignItems: "center",
  },
  scoreboardButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default Game;
