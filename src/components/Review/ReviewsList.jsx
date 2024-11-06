import React from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import ReviewItem from "./ReviewItem";

const ReviewsList = ({
  reviews,
  onRemovePress,
  shopSelected,
  emptyMessage = "No reviews yet",
}) => {
  if (!reviews.length) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>{emptyMessage}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => (
        <ReviewItem
          item={item}
          shopSelected={shopSelected}
          onRemovePress={onRemovePress ? () => onRemovePress(item.id) : undefined}
          showRemove={!!onRemovePress}
        />
      )}
      keyExtractor={(item) => item.id}
      scrollEnabled={false}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  emptyContainer: {
    padding: 20,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#BDB3A0",
    fontStyle: "italic",
  },
});

export default ReviewsList;
