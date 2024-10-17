// src/screens/WaitingRoom.jsx
import React, { useState, useRef, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, ImageBackground, FlatList, Image, PanResponder} from "react-native";
import ButtonPerso from "../components/Element";

const WaitingRoom = () => {
    const [playerList, setPlayerList] = useState([
        { id: '1', name: 'Safou' },
        { id: '2', name: 'Ptitbapt' },
        { id: '3', name: 'RuKasu' },
        { id: '4', name: 'Maxime' },
        { id: '5', name: 'Archantrax'},
        { id: '6', name: 'Hugo'},
        { id: '7', name: 'Archantrax'},
        { id: '8', name: 'Hugo'},
        { id: '9', name: 'Archantrax'},
        { id: '10', name: 'Hugo'},
      ]);
      const flatListRef = useRef(null);
      const scrollOffset = useRef(0);   
      const [isScrolling, setIsScrolling] = useState(true);
      const scrollTimeoutRef = useRef(null);

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
    ).current;


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
            ref={flatListRef}
            data={playerList}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ButtonPerso title={item.name} style={styles.playerName}></ButtonPerso>
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
