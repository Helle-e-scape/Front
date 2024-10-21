// App.js
import React, { useState } from "react";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import Router from "./src/navigation/Router";
import { Text, TextInput, StyleSheet } from "react-native";

// Charger les polices Minecraft
const fetchFonts = () => {
  return Font.loadAsync({
    "Minecraft-Regular": require("./src/assets/fonts/Minecraft.ttf"),
    "Minecraft-Bold": require("./src/assets/fonts/Minecraft-Bold.otf"),
  });
};

// Créer un composant Text personnalisé pour appliquer Minecraft-Regular
const CustomText = ({ style, children, ...props }) => {
  return (
    <Text style={[{ fontFamily: "Minecraft-Regular" }, style]} {...props}>
      {children}
    </Text>
  );
};

// Créer un composant TextInput personnalisé pour appliquer Minecraft-Regular
const CustomTextInput = ({ style, ...props }) => {
  return (
    <TextInput
      style={[{ fontFamily: "Minecraft-Regular" }, style]}
      {...props}
    />
  );
};

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  if (!fontsLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontsLoaded(true)}
        onError={console.warn}
      />
    );
  }

  return <Router CustomText={CustomText} CustomTextInput={CustomTextInput} />;
}
