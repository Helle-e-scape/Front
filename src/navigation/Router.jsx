// src/navigation/Router.jsx
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigationStack from "./AuthNavigationStack";

const Router = () => {
  return (
    <NavigationContainer>
      <AuthNavigationStack />
    </NavigationContainer>
  );
};

export default Router;
