// src/navigation/Router.jsx
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigationStack from "./AuthNavigationStack";

import { WebSocketProvider } from "../context/WebSocketContext";
import { UserProvider } from "../context/UserContext";

const Router = ({ CustomText, CustomTextInput }) => {
  return (
    <UserProvider>
    <WebSocketProvider>
    <NavigationContainer>
      <AuthNavigationStack
        CustomText={CustomText}
        CustomTextInput={CustomTextInput}
      />
    </NavigationContainer>
    </WebSocketProvider>
    </UserProvider>
  );
};

export default Router;
