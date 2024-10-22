// src/navigation/Router.jsx
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigationStack from "./AuthNavigationStack";

const Router = ({ CustomText, CustomTextInput }) => {
  return (
    <NavigationContainer>
      <AuthNavigationStack
        CustomText={CustomText}
        CustomTextInput={CustomTextInput}
      />
    </NavigationContainer>
  );
};

export default Router;