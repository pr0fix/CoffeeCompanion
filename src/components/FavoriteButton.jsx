import { Pressable, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

// Component which renders the heart-shaped favorite bottom in bottomsheet
const FavoriteButton = ({ onPress, isFavorite }) => {
  return (
    <Pressable style={styles.heartButton} onPress={onPress}>
      <Icon
        name={isFavorite ? "heart" : "heart-outline"}
        size={24}
        color={isFavorite ? "red" : "gray"}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  heartButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#F4ECE3",
    borderWidth: 1,
    borderColor: "#A87544",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadorRadius: 2,
    elevation: 5,
  },
});

export default FavoriteButton;
