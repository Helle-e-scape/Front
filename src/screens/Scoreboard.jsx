// src/screens/Scoreboard.jsx
import React, { useState, useRef } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import _ from "lodash";

const { height: screenHeight } = Dimensions.get("window");

// Hook personnalisé pour gérer la visibilité du joueur actuel
function useCurrentUserVisibility(currentUserPosition, flatListRef) {
  const [isVisible, setIsVisible] = useState(false);

  const onViewableItemsChanged = _.throttle(({ viewableItems }) => {
    const visible = viewableItems.some(
      (item) => item.index === currentUserPosition - 1
    );
    setIsVisible(visible);
  }, 200); // Mise à jour toutes les 200ms

  const scrollToCurrentUser = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({
        index: currentUserPosition - 1,
        animated: true,
      });
    }
  };

  return { isVisible, onViewableItemsChanged, scrollToCurrentUser };
}

const Scoreboard = ({ route }) => {
  const { CustomText } = route.params; // Récupérer CustomText
  const navigation = useNavigation();
  const flatListRef = useRef(null);

  // Joueur actuel
  const [currentUser] = useState({
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

  // Utilisation du hook personnalisé
  const { isVisible, onViewableItemsChanged, scrollToCurrentUser } =
    useCurrentUserVisibility(currentUser.position, flatListRef);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const renderItem = ({ item }) => (
    <View
      style={[
        styles.playerRow,
        item.position === currentUser.position && isVisible
          ? styles.highlightedPlayer
          : null,
      ]}
    >
      <CustomText style={styles.playerText}>{item.position}</CustomText>
      <CustomText style={styles.playerText}>{item.name}</CustomText>
      <CustomText style={styles.playerText}>{item.score}</CustomText>
    </View>
  );

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50, // 50% de l'élément doit être visible pour le considérer visible
  };

  return (
    <ImageBackground
      source={require("../assets/images/background.jpeg")}
      style={styles.background}
    >
      <SafeAreaView style={styles.container}>
        {/* Bouton de retour */}
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>

        {/* Podium */}
        <View style={styles.podium}>
          <CustomText style={styles.podiumText}>Podium</CustomText>
          <CustomText style={styles.podiumSubText}>Top 3 Players</CustomText>
        </View>

        {/* Tableau des joueurs */}
        <FlatList
          ref={flatListRef}
          data={players}
          renderItem={renderItem}
          keyExtractor={(item) => item.position.toString()}
          style={styles.playerList}
          initialNumToRender={20} // Rendre 20 éléments au départ
          maxToRenderPerBatch={10} // Rendre 10 éléments à la fois pendant le défilement
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
        />

        {/* Joueur actuel affiché en bas (disparaît si visible dans la liste) */}
        {!isVisible && (
          <TouchableOpacity
            style={styles.currentPlayerContainer}
            onPress={scrollToCurrentUser}
          >
            <CustomText style={styles.currentPlayerText}>
              #{currentUser.position}
            </CustomText>
            <CustomText style={styles.currentPlayerText}>
              {currentUser.name}
            </CustomText>
            <CustomText style={styles.currentPlayerText}>
              {currentUser.score}
            </CustomText>
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
    backgroundColor: "#6200ea",
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
