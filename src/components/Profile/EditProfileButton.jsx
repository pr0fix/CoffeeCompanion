import React, { useLayoutEffect } from "react";
import { Pressable, StyleSheet, Text } from "react-native";

// Edit profile button component
const EditProfileButton = ({ navigation }) =>
  
  // Set the edit profile button to the right of the header
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          style={styles.editButton}
          onPress={() => navigation.navigate("EditProfile")}
        >
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </Pressable>
      ),
    });
  }, [navigation]);

const styles = StyleSheet.create({
  editButton: {
    padding: 10,
    marginRight: 5,
    backgroundColor: "#A87544",
    borderRadius: 8,
    alignItems: "center",
  },
  editButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default EditProfileButton;
