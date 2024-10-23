// src/navigation/AuthNavigationStack.jsx
import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/Login";
import Room from "../screens/Room";
import { WebSocketProvider } from "../context/WebSocketContext";
import { UserProvider } from "../context/UserContext";
import WaitingRoom from "../screens/WaitingRoom";
import Game from "../screens/Game";
import Scoreboard from "../screens/Scoreboard";
import Trap from "../screens/Trap"; // Import de l'écran Trap
import Grid from "../screens/Grid"; // Import de l'écran Grid

const Stack = createStackNavigator();

const AuthNavigationStack = ({ CustomText, CustomTextInput }) => {
  return (
    <UserProvider>
    <WebSocketProvider>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ title: "Login" }}
        initialParams={{ CustomText, CustomTextInput }}
      />
      <Stack.Screen
        name="Room"
        component={Room}
        options={{ title: "Room" }}
        initialParams={{ CustomText, CustomTextInput }}
      />
      <Stack.Screen
        name="WaitingRoom"
        component={WaitingRoom}
        options={{ title: "WaitingRoom" }}
        initialParams={{ CustomText, CustomTextInput }}
      />
      <Stack.Screen
        name="Game"
        component={Game}
        options={{ title: "Game" }}
        initialParams={{ CustomText, CustomTextInput }}
      />
      <Stack.Screen
        name="Scoreboard"
        component={Scoreboard}
        options={{ title: "Scoreboard" }}
        initialParams={{ CustomText, CustomTextInput }}
      />
      <Stack.Screen
        name="Trap"
        component={Trap} // Ajout de l'écran Trap
        options={{ title: "Trap" }}
        initialParams={{ CustomText, CustomTextInput }}
      />
      <Stack.Screen
        name="Grid"
        component={Grid} // Ajout de l'écran Grid
        options={{ title: "Grid" }}
        initialParams={{ CustomText, CustomTextInput }}
      />
    </Stack.Navigator>
    </WebSocketProvider>
    </UserProvider>
  );
};

export default AuthNavigationStack;