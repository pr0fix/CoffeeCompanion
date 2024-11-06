import { StyleSheet, Text, View } from "react-native";
import FavoriteButton from "../Favorites/FavoriteButton";
import formatDistance from "../../utils/formatDistance";

// Renders the header for bottom sheet with shop name, address, distance and favorite button.
const ShopHeader = ({
  selectedShop,
  user,
  isFavorite,
  onPressFavoriteButton,
}) => {
  return (
    <View style={styles.shopHeader}>
      <View style={{ flex: 1 }}>
        <Text style={styles.shopName}>{selectedShop.name}</Text>
        <Text style={styles.shopAddress}>
          {selectedShop.location.address || "No address available."}
        </Text>
        <Text style={styles.distance}>
          {formatDistance(selectedShop.distance)}
        </Text>
      </View>
      {user && (
        <FavoriteButton
          onPress={onPressFavoriteButton}
          isFavorite={isFavorite}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({  
   shopHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  shopName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#6F3E37",
  },
  shopAddress: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#A87544",
  },
  distance: {
    fontSize: 16,
    color: "#A87544",
  },
});

export default ShopHeader;
