// src/screens/ButtonNext.jsx
import React, { useState } from "react";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";


const PixelButton2 = ({ title, roomCode }) => {
  const [isPressed, setIsPressed] = useState(false);
  const navigation = useNavigation();

  const handlePress = () => {
    setIsPressed(true);
    if (roomCode.trim()) {
      alert(`Joining room with code: ${roomCode}`);
      setTimeout(() => {
        navigation.navigate(title);
      }, 1000);
    } else {
      alert("Please enter the room code");
    };
    
  };

  setTimeout(() => {
    setIsPressed(false); // Revenir à l'état non pressé
  }, 250);

  // Retarder la navigation pour montrer l'animation avant de changer d'écran
  /*setTimeout(() => {
    navigation.navigate(title); // Naviguer après le délai
  }, 3000); // Durée synchronisée avec l'animation*/

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handlePress} disabled={isPressed}>
          <Image
            source={
              isPressed
                ? require("../assets/images/NextButtonClicked.png") // Reste sur cette image après l'appui
                : require("../assets/images/NextButton.png")
            }
            style={styles.buttonImage}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'white', 
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8, 
    borderColor: 'black', 
    borderWidth: 4, 
    shadowColor: 'black', 
    shadowOffset: { width: 4, height: 4 }, 
    shadowOpacity: 1, 
    shadowRadius: 0,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold', 
    color: 'black',
    fontFamily: 'monospace', 
  },
  buttonImage: {
    marginTop: '30%',
  }
});

export default PixelButton2;
