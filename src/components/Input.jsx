// src/screens/Input.jsx
import React, { useState } from "react";
import { TextInput, StyleSheet, View } from "react-native";

const InputPerso = ({ placeholder, onInputChange }) => {
  const [value, setValue] = useState("");

  const handleChangeText = (text) => {
    setValue(text);
    if (onInputChange) {
      onInputChange(text); 
    }
  };

  return (
    <View style={styles.input}>
    <TextInput
      style={styles.inputText}
      placeholder={placeholder}
      placeholderTextColor={'grey'}
      value={value}
      onChangeText={handleChangeText}
    />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 5, 
    borderColor: 'black',
    borderRadius: 10, 
    padding: 5,
    backgroundColor: '#fff', 
    width: 350,
    height: 65,
    justifyContent: 'center',
  },
  inputText: {
    paddingHorizontal: 10,
    fontSize: 16,
    color: 'black',
    fontFamily: 'Minecraft',
  },
});

export default InputPerso;
