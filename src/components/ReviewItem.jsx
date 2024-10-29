import { View, Text, StyleSheet } from "react-native";

// Returns a review item card to be shown in list of reviews
const ReviewItem = ({ item, shopSelected }) => {
  const formattedDate = new Date(item.createdAt).toLocaleDateString();

  return (
    <View style={styles.reviewCard}>
      <Text style={styles.shopName}>{item.shopName}</Text>
      <Text style={styles.shopAddress}>{item.address}</Text>
      <Text style={styles.reviewDate}>{formattedDate}</Text>
      {shopSelected && (
        <Text style={styles.username}>Reviewed by: {item.username}</Text>
      )}
      <Text style={styles.reviewText}>{item.text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  reviewCard: {
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
  reviewDate: {
    color: "#777",
    marginBottom: 8,
  },
  username: {
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  reviewText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#555",
  },
});

export default ReviewItem;
