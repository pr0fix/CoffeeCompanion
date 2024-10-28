import React from "react";
import { useNotification } from "../contexts/NotificationContext";
import { StyleSheet, Text, View } from "react-native";

// Notification component
const Notification = () => {
  const { notification } = useNotification();

  if (!notification) return null;

  return (
    <View style={styles.notificationContainer}>
      <View style={[styles.notification, styles[notification.type]]}>
        <Text style={styles.notificationText}>{notification.message}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  notificationContainer: {
    position: "absolute",
    top: 90,
    left: 10,
    right: 10,
    zIndex: 1000,
    alignItems: "center",
  },
  notification: {
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  notificationText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  info: {
    backgroundColor: "#2196f3",
  },
  success: {
    backgroundColor: "#4caf50",
  },
  error: {
    backgroundColor: "#f44336",
  },
  warning: {
    backgroundColor: "#ff9800",
  },
});

export default Notification;
