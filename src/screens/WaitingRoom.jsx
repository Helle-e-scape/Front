// src/screens/WaitingRoom.jsx
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, ImageBackground, FlatList, Image} from "react-native";

const WaitingRoom = () => {
    const [playerList, setPlayerList] = useState([
        { id: '1', name: 'Safou' },
        { id: '2', name: 'Ptitbapt' },
        { id: '3', name: 'RuKasu' },
        { id: '4', name: 'Maxime' },
        { id: '5', name: 'Archantrax'},
        { id: '6', name: 'Hugo'},
      ]);
    

    return (
        <ImageBackground
        source={require("../assets/background.jpeg")}
        style={styles.background}>
        <View style={styles.container}>
        <View style={styles.topSection}>
          <Image
            source={require("../assets/title.png")}
            style={styles.titleImage}
          />
          </View>
          <Text style={styles.title}>Players List</Text>
          <FlatList
            data={playerList}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Text style={styles.playerName}>{item.name}</Text>
            )}
          />
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
            justifyContent: "space-between",
          },
        list: {
            justifyContent: "center",
            alignItems: "center",
        },
        title: {
            textAlign: "center",
            color: "white",
          },
        topSection: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: "10%",
          },
        titleImage: {
            width: 200,
            height: 100,
            resizeMode: "contain",
          },
        playerName: {
            fontSize: 15,
            color: "white",
        }  
    })

export default WaitingRoom;
