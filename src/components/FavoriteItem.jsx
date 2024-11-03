import { View, Text, StyleSheet } from "react-native";
import useHandleFavorites from "../hooks/useHandleFavorites";
import FavoriteButton from "./FavoriteButton";

const FavoriteItem = ({ item, userId, favorites }) => {
  const { handleRemoveFavorite } = useHandleFavorites();
  const isFavorite = favorites?.some((favorite) => favorite.id === item.id);

  const handleFavoriteButtonPress = async () => {
    await handleRemoveFavorite(userId, item.id);
  };

  return (
    <View style={styles.favoriteCard}>
      <View style={styles.cardRow}>
        <View style={styles.textContainer}>
          <Text style={styles.shopName}>{item.shopName}</Text>
          <Text style={styles.shopAddress}>{item.address}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <FavoriteButton
            onPress={handleFavoriteButtonPress}
            isFavorite={isFavorite}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  favoriteCard: {
    margin: 10,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E5D3C5",
    shadowColor: "#6F3E37",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
  },
  shopName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#6F3E37",
    marginBottom: 6,
    letterSpacing: 0.3,
  },
  shopAddress: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#A87544",
    marginBottom: 4,
    letterSpacing: 0.2,
  },
  buttonContainer: {
    width: 45,
    paddingLeft: 20,
    alignItems: "center",
    justifyContent: "center",
    transform: [{ scale: 0.9 }],
  },
});

export default FavoriteItem;
