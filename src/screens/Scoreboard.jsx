// src/screens/Scoreboard.jsx
import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

const { height: screenHeight } = Dimensions.get("window");

const Scoreboard = () => {
  const navigation = useNavigation();
  const flatListRef = useRef(null);
  const [isCurrentUserVisible, setIsCurrentUserVisible] = useState(false); // Pour contrôler la visibilité du joueur actuel en bas

  // Joueur actuel
  const [currentUser, setCurrentUser] = useState({
    position: 50,
    name: "Current Player",
    score: 200,
  });

  // Générer une longue liste de joueurs avec currentUser inclus
  const players = Array.from({ length: 100 }, (_, index) => ({
    position: index + 1,
    name: `Player ${index + 1}`,
    score: Math.floor(Math.random() * 1000) + 100,
  }));

  players[currentUser.position - 1] = currentUser; // Ajouter explicitement currentUser à sa position dans la liste

  const handleGoBack = () => {
    navigation.goBack();
  };

  const renderItem = ({ item }) => (
    <View
      style={[
        styles.playerRow,
        item.position === currentUser.position && isCurrentUserVisible
          ? styles.highlightedPlayer
          : null,
      ]}
    >
      <Text style={styles.playerText}>{item.position}</Text>
      <Text style={styles.playerText}>{item.name}</Text>
      <Text style={styles.playerText}>{item.score}</Text>
    </View>
  );

  const scrollToCurrentUser = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({
        index: currentUser.position - 1,
        animated: true,
      });
    }
  };

  // Fonction pour vérifier si le currentUser est visible dans la vue
  const onViewableItemsChanged = ({ viewableItems }) => {
    const isVisible = viewableItems.some(
      (item) => item.index === currentUser.position - 1
    );
    setIsCurrentUserVisible(isVisible); // Masquer l'utilisateur en bas si visible dans la liste
  };

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50, // 50% de l'élément doit être visible pour le considérer visible
  };

  return (
    <ImageBackground
      source={require("../assets/background.jpeg")}
      style={styles.background}
    >
      <SafeAreaView style={styles.container}>
        {/* Bouton de retour */}
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>

        {/* Podium */}
        <View style={styles.podium}>
          <Text style={styles.podiumText}>Podium</Text>
          <Text style={styles.podiumSubText}>Top 3 Players</Text>
        </View>

        {/* Tableau des joueurs */}
        <FlatList
          ref={flatListRef}
          data={players}
          renderItem={renderItem}
          keyExtractor={(item) => item.position.toString()}
          style={styles.playerList}
          onViewableItemsChanged={onViewableItemsChanged} // Événement déclenché lors du défilement
          viewabilityConfig={viewabilityConfig}
        />

        {/* Joueur actuel affiché en bas (disparaît si visible dans la liste) */}
        {!isCurrentUserVisible && (
          <TouchableOpacity
            style={styles.currentPlayerContainer}
            onPress={scrollToCurrentUser}
          >
            <Text style={styles.currentPlayerText}>
              #{currentUser.position}
            </Text>
            <Text style={styles.currentPlayerText}>{currentUser.name}</Text>
            <Text style={styles.currentPlayerText}>{currentUser.score}</Text>
          </TouchableOpacity>
        )}
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
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 1,
  },
  podium: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 10,
  },
  podiumText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  podiumSubText: {
    fontSize: 16,
    color: "#888",
  },
  playerList: {
    flex: 1,
    marginTop: 20,
  },
  playerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  playerText: {
    fontSize: 16,
    color: "#fff",
  },
  highlightedPlayer: {
    backgroundColor: "#6200ea", // Surligner en violet
  },
  currentPlayerContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#6200ea",
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  currentPlayerText: {
    fontSize: 16,
    color: "#fff",
  },
});

export default Scoreboard;
