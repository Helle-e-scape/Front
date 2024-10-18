// src/screens/WaitingRoom.jsx
import React from "react";
import { View, Image, ImageBackground, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Pour la flèche de retour
import { useNavigation } from "@react-navigation/native"; // Pour la navigation

const WaitingRoom = ({ route }) => {
  const { CustomText } = route.params;
  const navigation = useNavigation(); // Utilisation de la navigation pour le retour

  const handleJoinGame = () => {
    navigation.navigate("Game");
  };

  return (
    <ImageBackground
      source={require("../assets/images/background.jpeg")}
      style={styles.background}
    >
      {/* Flèche de retour */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>

      <View style={styles.container}>
        <View style={styles.topSection}>
          <Image
            source={require("../assets/images/title.png")}
            style={styles.titleImage}
          />
        </View>
        <View style={styles.bottomSection}>
          <TouchableOpacity style={styles.joinButton} onPress={handleJoinGame}>
            <CustomText style={styles.joinButtonText}>Join the game</CustomText>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = {
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  backButton: {
    position: "absolute",
    top: 50, // Ajuste la position de la flèche en haut à gauche
    left: 20,
    zIndex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  topSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: "10%", // Même positionnement que dans Room.jsx
  },
  bottomSection: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingBottom: "10%", // Même positionnement que dans Room.jsx
  },
  titleImage: {
    width: 200,
    height: 100,
    resizeMode: "contain", // Même taille que dans Room.jsx
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

export default WaitingRoom;
