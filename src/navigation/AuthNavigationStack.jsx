// src/navigation/AuthNavigationStack.jsx
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/Login";
import Room from "../screens/Room";
import WaitingRoom from "../screens/WaitingRoom";

const Stack = createStackNavigator();

const AuthNavigationStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ title: "Login" }}
      />
      <Stack.Screen name="Room" component={Room} options={{ title: "Room" }} />
      <Stack.Screen name="Waiting Room" component={WaitingRoom} options={{title: "Waiting Room"}}/>
    </Stack.Navigator>
  );
};

export default AuthNavigationStack;
