import { Pressable, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

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
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
});

export default FavoriteButton;
