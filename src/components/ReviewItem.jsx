import { View, Text, StyleSheet } from "react-native";

const ReviewItem = ({ item }) => {
  return (
    <View style={styles.reviewCard}>
      <Text style={styles.shopName}>{item.shopName}</Text>
      <Text style={styles.shopAddress}>{item.address}</Text>
      <Text style={styles.reviewDate}>{item.createdAt}</Text>
      <Text style={styles.reviewText}>{item.text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  reviewCard: {
    margin: 10,
    padding: 15,
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  shopName: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 5,
  },
  shopAddress: {
    fontStyle: "italic",
    color: "#555",
    marginBottom: 5,
  },
  reviewDate: {
    color: "#555",
    marginBottom: 5,
  },
  reviewText: {
    marginTop: 5,
    fontSize: 16,
    lineHeight: 22,
  },
});

export default ReviewItem;
