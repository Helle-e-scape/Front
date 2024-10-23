// src/screens/WaitingRoom.jsx
import React, { useState, useRef, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, ImageBackground, FlatList, Image, PanResponder} from "react-native";
import ButtonPerso from "../components/Element";
import { useUser } from "../context/UserContext";
import { authApi } from "../_api/user.api";

const WaitingRoom = () => {
    const [playerList, setPlayerList] = useState([]);
      const flatListRef = useRef(null);
      const scrollOffset = useRef(0);   
      const [isScrolling, setIsScrolling] = useState(true);
      const scrollTimeoutRef = useRef(null);
      const {user} = useUser();

      const isListed = async () => {
        console.log("toto");
        await authApi.findByIdRoom(user.roomId)
        .then(response => {
            setPlayerList(response.data);
        })
        
      }

      useEffect(() => {
        console.log("useEffect called");
        isListed();
    }, []);

      /*useEffect(() => {
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

    const stopScrolling = () => {
        setIsScrolling(false);
        if (scrollTimeoutRef.current) {
            clearInterval(scrollTimeoutRef.current); 
        }
    };

    const restartScrolling = () => {
        if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current);
        }
        scrollTimeoutRef.current = setTimeout(() => {
            setIsScrolling(true);  
        }, 10000);  
    };

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
