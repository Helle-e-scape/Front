// src/screens/Trap.jsx
import React, { useState, useEffect } from "react";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Pour l'icône danger
import { useUser } from "../context/UserContext";
import { trapUserApi } from "../_api/trapUser.api";

const Trap = ({ route }) => {
  const { CustomText } = route.params;
  const [isPressed, setIsPressed] = useState(false); // État pour savoir si le bouton est pressé
  const {user, setUser} = useUser();
  const [traps, setTraps] = useState([]);
  const [allTraps, setAllTraps] = useState([]);
  // const { roomId } = route.params;

  const handlePress = () => {
    setIsPressed(true); // Une fois pressé, rester dans l'état pressé
  };

  useEffect(() => {
    const fetchTraps = async () => {
      try {
        const response = await trapUserApi.findAllByIdRoom(user.roomId);


        const allTrapsData = response.trap || [];

        console.log(allTrapsData)
        
        setAllTraps(allTrapsData);
        
        const userTraps = allTraps.filter(trap => trap.userId === user._id);
        console.log(user._id)
        setTraps(userTraps);
        console.log(userTraps);
      } catch (error) {
        console.error("Erreur lors de la récupération des pièges:", error);
      }
    };
    fetchTraps();
  }, [user.roomId]);

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        {/* Bouton qui change d'image quand il est pressé */}
        <TouchableOpacity onPress={handlePress} disabled={isPressed}>
          <Image
            source={
              isPressed
                ? require("../assets/images/red_button_press.png") // Reste sur cette image après l'appui
                : require("../assets/images/red_button_unpress.png")
            }
            style={styles.buttonImage}
          />
        </TouchableOpacity>
      </View>

      {/* Texte "DO NOT PRESS" avec icône danger */}
      <View style={styles.warningContainer}>
        <Ionicons name="warning" size={30} color="red" />
        <CustomText style={styles.warningText}>DO NOT PRESS</CustomText>
        <Ionicons name="warning" size={30} color="red" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#b0b0b0", // Couleur de fond plus claire
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  buttonImage: {
    width: 250, // Largeur du bouton
    height: 250, // Hauteur du bouton
    resizeMode: "contain",
  },
  warningContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20, // Espacement entre le bouton et le texte d'avertissement
  },
  warningText: {
    fontSize: 30,
    color: "red",
    marginLeft: 10,
    fontFamily: "Minecraft-Bold", // Police Minecraft-Bold
  },
});

export default Trap;