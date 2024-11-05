import React from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import FavoriteItem from "../FavoriteItem";

// Favorites list component
const FavoritesList = ({ favorites, userId }) => {
  if (!favorites.length) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No favorites yet</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={favorites}
      renderItem={({ item }) => (
        <FavoriteItem item={item} userId={userId} favorites={favorites} />
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

export default FavoritesList;
