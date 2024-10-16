// src/navigation/AuthNavigationStack.jsx
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/Login";
import Room from "../screens/Room";
import WaitingRoom from "../screens/WaitingRoom";
import Game from "../screens/Game";
import Scoreboard from "../screens/Scoreboard"; // Import de Scoreboard

const Stack = createStackNavigator();

const AuthNavigationStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Scoreboard"
        component={Scoreboard}
        options={{ title: "Scoreboard" }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ title: "Login" }}
      />
      <Stack.Screen name="Room" component={Room} options={{ title: "Room" }} />
      <Stack.Screen
        name="WaitingRoom"
        component={WaitingRoom}
        options={{ title: "WaitingRoom" }}
      />
      <Stack.Screen name="Game" component={Game} options={{ title: "Game" }} />
    </Stack.Navigator>
  );
};

export default AuthNavigationStack;
