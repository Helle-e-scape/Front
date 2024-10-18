// src/screens/Game.jsx
import React from "react";
import { View, ImageBackground, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native"; // Importer useNavigation

const Game = ({ route }) => {
  const { CustomText } = route.params;
  const navigation = useNavigation(); // Utiliser la navigation

  const handleTrapPress = () => {
    navigation.navigate("Trap"); // Rediriger vers l'écran Trap
  };

  return (
    <ImageBackground
      source={require("../assets/images/background.jpeg")}
      style={styles.background}
    >
      <View style={styles.container}>
        <TouchableOpacity style={styles.trapButton} onPress={handleTrapPress}>
          <CustomText style={styles.trapButtonText}>Piège</CustomText>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.scoreboardButton}
          onPress={() => navigation.navigate("Scoreboard")}
        >
          <CustomText style={styles.scoreboardButtonText}>
            Scoreboard
          </CustomText>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = {
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
  },
  trapButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  scoreboardButton: {
    marginTop: 20,
    backgroundColor: "#28a745",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    alignItems: "center",
  },
  scoreboardButtonText: {
    color: "#fff",
    fontSize: 16,
  },
};

export default Game;
