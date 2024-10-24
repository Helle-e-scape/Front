// src/screens/WaitingRoom.jsx
import React, { useState, useRef, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, ImageBackground, FlatList, Image, PanResponder } from "react-native";
import ButtonPerso from "../components/Element";
import { useUser } from "../context/UserContext";
import { authApi } from "../_api/user.api";
import { useWebSocket } from "../context/WebSocketContext";

useEffect(() => {
  const fetchPlayerList = async () => {
    try {
      const response = await authApi.findByIdRoom(user.room._id);
      setPlayerList(response.users); // Remplir la liste avec les utilisateurs récupérés via l'API
    } catch (error) {
      console.error('Error fetching players:', error);
    }
  };
  fetchPlayerList();
}, []);

useEffect(() => {
  if (socket) {
    socket.onmessage = (message) => {
      const data = JSON.parse(message.data); // Parse le message reçu

      if (data.type === "join_room") {
              
          if (user._id != data.user._id && data.room._id == user.room._id)  {        
            
          const updateUserList = (newUser) => {
            console.log("new user dans la methode : ", newUser);
            
            setPlayerList((prevList) => [...prevList, newUser]); // Ajoute le nouvel utilisateur à la liste existante
          };

          updateUserList(data.user);
          console.log("liste des user : ", playerList);
        };
      };
    };
  };
}, [socket]);

      /*useEffect(() => {
        const startScrolling = () => {
            scrollTimeoutRef.current = setInterval(() => {
                if (isScrolling && flatListRef.current) {
                    scrollOffset.current += 1; 
                    flatListRef.current.scrollToOffset({ offset: scrollOffset.current, animated: true });
                }
            }, 100);  
        };
      };
    };
  }, [socket]);


  useEffect(() => {
    const startScrolling = () => {
      scrollTimeoutRef.current = setInterval(() => {
        if (isScrolling && flatListRef.current) {
          scrollOffset.current += 1;
          flatListRef.current.scrollToOffset({ offset: scrollOffset.current, animated: true });
        }
      }, 100);
    };

    startScrolling();

    return () => {
      if (scrollTimeoutRef.current) {
        clearInterval(scrollTimeoutRef.current);
      }
    };
  }, [isScrolling]);

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,  
            onPanResponderGrant: () => {
                stopScrolling();
            },
            onPanResponderRelease: () => {
                restartScrolling();  
            },
        })
    ).current;*/


  return (
    <ImageBackground
      source={require("../assets/images/background.jpeg")}
      style={styles.background}>
      <View style={styles.container}>
        <View style={styles.topSection}>
          <Image
            source={require("../assets/images/title.png")}
            style={styles.titleImage}
          />
          </View>
          <Text  style={styles.title}>Players List</Text>
          <FlatList style={styles.list}
            ref={flatListRef}
            data={playerList}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ButtonPerso title={item.pseudo} style={styles.playerName}></ButtonPerso>
            )}
          />
        </View>
        <Text style={styles.title}>Players List</Text>
        <FlatList style={styles.list}
          ref={flatListRef}
          data={playerList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ButtonPerso title={item.name} style={styles.playerName}></ButtonPerso>
          )}
        />
    </ImageBackground>
  );

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
    flex: 1,
    marginBottom: "20%",
  },
  title: {
    textAlign: "center",
    color: "white",
    marginBottom: "10%",
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
