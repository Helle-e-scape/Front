// src/navigation/AuthNavigationStack.jsx
import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/Login";
import Room from "../screens/Room";
import { WebSocketProvider } from "../context/WebSocketContext";
import { UserProvider } from "../context/UserContext";

const Stack = createStackNavigator();

const AuthNavigationStack = () => {
  return (
    <UserProvider>
    <WebSocketProvider>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: "Login" }}
        />
        <Stack.Screen name="Room" component={Room} options={{ title: "Room" }} />
      </Stack.Navigator>
    </WebSocketProvider>
    </UserProvider>
  );
};

export default AuthNavigationStack;
