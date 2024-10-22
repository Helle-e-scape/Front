import React, { useState } from "react";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";


const PixelButton2 = ({ title, roomCode }) => {
  const [isPressed, setIsPressed] = useState(false);
  const navigation = useNavigation(); // État pour savoir si le bouton est pressé

  const handlePress = () => {
    setIsPressed(true); // Une fois pressé, rester dans l'état pressé
    if (roomCode.trim()) {
      alert(`Joining room with code: ${roomCode}`);
      navigation.navigate(title);
    } else {
      alert("Please enter the room code");
    };
    
  };

  setTimeout(() => {
    setIsPressed(false); // Revenir à l'état non pressé
  }, 500); // Durée de l'animation (500ms ici)

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
});

export default PixelButton2;
