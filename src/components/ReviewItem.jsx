import { View, Text, StyleSheet, Pressable } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

// Returns a review item card to be shown in list of reviews
const ReviewItem = ({
  item,
  shopSelected,
  onRemovePress,
  showRemove = false,
}) => {
  const formattedDate = new Date(item.createdAt).toLocaleDateString();
  return (
    <View style={styles.reviewCard}>
      <View style={styles.reviewContent}>
        <Text style={styles.shopName}>{item.shopName}</Text>
        <Text style={styles.shopAddress}>{item.address}</Text>
        <Text style={styles.reviewDate}>{formattedDate}</Text>
        {shopSelected && (
          <Text style={styles.username}>Reviewed by: {item.username}</Text>
        )}
        <Text style={styles.reviewText}>{item.text}</Text>
      </View>
      {showRemove && (
        <Pressable
          style={styles.deleteButton}
          onPress={() => onRemovePress(item.id)}
        >
          <Icon name="delete-outline" size={26} color="#FF0000" />
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  reviewCard: {
    margin: 10,
    backgroundColor: "white",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5D3C5",
    shadowColor: "#6F3E37",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    position: "relative",
  },
  reviewContent: {
    padding: 16,
    paddingRight: 40,
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
    color: "#A87544",
    marginBottom: 8,
    fontStyle: "italic",
  },
  reviewDate: {
    fontSize: 13,
    color: "#8B6B5D",
    marginBottom: 8,
    fontStyle: "italic",
  },
  username: {
    fontSize: 14,
    fontWeight: "500",
    color: "#6F3E37",
    marginBottom: 8,
  },
  reviewText: {
    fontSize: 15,
    lineHeight: 22,
    color: "#6F3E37",
  },
  deleteButton: {
    position: "absolute",
    top: 12,
    right: 12,
    padding: 8,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  deleteButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default ReviewItem;
