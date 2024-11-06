import React from "react";
import { Pressable, Text, StyleSheet, Alert } from "react-native";

// Sign out button component
const SignOutButton = ({ onPress }) => {
  
  // Alert the user to confirm sign out
  const handlePress = () => {
    Alert.alert("Sign out", "Are you sure you want to sign out?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Sign out",
        onPress: () => {
          onPress();
        },
      },
    ]);
  };

  return (
    <Pressable style={styles.signOutButton} onPress={handlePress}>
      <Text style={styles.signOutButtonText}>Sign Out</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  signOutButton: {
    marginVertical: 15,
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: "#C70000",
    borderRadius: 8,
    alignItems: "center",
    alignSelf: "center",
  },
  signOutButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default SignOutButton;
