import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import EditProfileButton from "./EditProfileButton";

// Profile header component
const ProfileHeader = ({ user, navigation }) => (
  <View style={styles.profileContainer}>
    <Image
      style={styles.image}
      source={{ uri: user.photoURL }}
      resizeMode="cover"
    />
    <Text style={styles.displayName}>{user.displayName}</Text>
    <Text style={styles.email}>{user.email}</Text>
    <EditProfileButton navigation={navigation} />
  </View>
);

const styles = StyleSheet.create({
  profileContainer: {
    alignItems: "center",
    paddingVertical: 30,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderColor: "#A87544",
    borderWidth: 2,
  },
  displayName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#6F3E37",
    marginTop: 10,
  },
  email: {
    fontSize: 16,
    color: "#A87544",
    marginTop: 5,
  },
});

export default ProfileHeader;
