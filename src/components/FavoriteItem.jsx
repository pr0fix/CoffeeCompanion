import { View, Text, StyleSheet } from "react-native";
import useHandleFavorites from "../hooks/useHandleFavorites";
import FavoriteButton from "./FavoriteButton";

// Returns a favorite item card to be shown in list of favorites
const FavoriteItem = ({ item, userId, favorites }) => {
  const { handleRemoveFavorite } = useHandleFavorites();

  const isFavorite = favorites?.some((favorite) => favorite.id === item.id)

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
        <FavoriteButton onPress={handleFavoriteButtonPress} isFavorite={isFavorite}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  favoriteCard: {
    margin: 10,
    padding: 20,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
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
  },
  shopName: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 8,
    color: "#333",
  },
  shopAddress: {
    fontStyle: "italic",
    color: "#777",
    marginBottom: 8,
  },
});

export default FavoriteItem;
