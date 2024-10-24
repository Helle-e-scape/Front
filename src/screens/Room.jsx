import React, { useState } from "react";
import {
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { roomApi } from "../_api/room.api";
import { useUser } from "../context/UserContext";
import { Ionicons } from "@expo/vector-icons"; // Pour la flèche de retour
import { useNavigation } from "@react-navigation/native"; // Pour la navigation

const Room = ({ navigation, route }) => {
  const { CustomText, CustomTextInput } = route.params; // Récupérer CustomText et CustomTextInput
  const [roomCode, setRoomCode] = useState("");
  const  { user, setUser }   = useUser();


  const handleJoinGame = async () => {
    if (roomCode.trim()) {
      await roomApi.userJoinRoom(user._id, roomCode)
        .then(response => {   
          setUser({ 
            ...user,
            room: response.existRoom
          });          
          alert(response.message);
          navigation.navigate("WaitingRoom");
        })
        .catch(error => {
          console.error(`Error for joining room`, error);
        })
    } else {
      alert("Please enter the room code");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1 }}>
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
              <CustomTextInput
                style={styles.input}
                placeholder="Enter the room code"
                placeholderTextColor="#888"
                value={roomCode}
                returnKeyType="go"
                onChangeText={setRoomCode}
                onSubmitEditing={handleJoinGame} // Appelle handleJoinGame quand "go" est pressé
              />
              <TouchableOpacity
                style={styles.joinButton}
                onPress={handleJoinGame}
              >
                <CustomText style={styles.joinButtonText}>
                  Join the game
                </CustomText>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = {
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  backButton: {
    position: "absolute",
    top: 50, // Ajuster la position de la flèche
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
    marginTop: "10%", // Même positionnement que dans WaitingRoom
  },
  bottomSection: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingBottom: "10%", // Même positionnement que dans WaitingRoom
  },
  titleImage: {
    width: 200,
    height: 100,
    resizeMode: "contain", // Même taille que dans WaitingRoom
  },
  input: {
    width: "80%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    backgroundColor: "#fff",
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
};

export default Room;