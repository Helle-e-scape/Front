// src/screens/Element.jsx
import React, { useRef } from "react";
import { Animated, View, StyleSheet, PanResponder, Text} from "react-native";

const ButtonPerso = ({title}) => {
    const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}]),
      onPanResponderRelease: () => {
        Animated.spring(pan, {
          toValue: {x: 0, y: 0},
          useNativeDriver: true,
        }).start();
      },
    }),
  ).current;

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          transform: [{translateX: pan.x}, {translateY: pan.y}],
        }}
        {...panResponder.panHandlers}>
          <View style={styles.box}>
        <Text style={{textAlign: 'center', fontFamily: 'Minecraft'}}>{title}</Text>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    titleText: {
      fontSize: 14,
      lineHeight: 24,
      fontWeight: 'bold',
    },
    box: {
      borderWidth: 5, 
      borderColor: 'black',
      borderRadius: 10, 
      padding: 5,
      backgroundColor: '#fff', 
      width: 350,
      height: 65,
      justifyContent: 'center',
      marginTop: '10%',
    },
  });

export default ButtonPerso;