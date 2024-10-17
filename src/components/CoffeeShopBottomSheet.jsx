import React, { useState } from "react";
import { Text, StyleSheet, Image, Pressable, View } from "react-native";
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetView,
} from "@gorhom/bottom-sheet";

import ReviewForm from "./ReviewForm";
import FavoriteButton from "./FavoriteButton";

const formatDistance = (distance) => {
  return distance >= 1000
    ? (distance / 1000).toFixed(1) + " km"
    : distance.toString() + " m";
};

const renderPhotoItem = ({ item }) => (
  <Image key={item.id} source={{ uri: item.url }} style={styles.photo} />
);

const CoffeeShopBottomSheet = ({
  selectedShop,
  bottomSheetRef,
  snapPoints,
}) => {
  const [reviewFormVisible, setReviewFormVisible] = useState(false);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
    >
      {selectedShop && (
        <>
          <BottomSheetView style={styles.bottomSheetContent}>
            <View style={styles.shopHeader}>
              <Text style={styles.shopName}>{selectedShop.name}</Text>
              <FavoriteButton />
            </View>
            <Text style={styles.address}>
              {selectedShop.location.address || "No address available."}
            </Text>
            <Text style={styles.distance}>
              {formatDistance(selectedShop.distance)}
            </Text>
          </BottomSheetView>
          {selectedShop.photos && selectedShop.photos.length > 0 ? (
            <BottomSheetFlatList
              data={selectedShop.photos}
              renderItem={renderPhotoItem}
              keyExtractor={(item) => item.id}
              horizontal={false}
              showsHorizontalScrollIndicator={false}
            />
          ) : (
            <BottomSheetView style={styles.bottomSheetContent}>
              <Text>No photos available for this coffee shop.</Text>
            </BottomSheetView>
          )}
          {!reviewFormVisible ? (
            <View style={styles.buttonContainer}>
              <Pressable
                style={styles.toggleReviewForm}
                onPress={() => setReviewFormVisible(true)}
              >
                <Text style={styles.toggleReviewFormText}>Write a review</Text>
              </Pressable>
            </View>
          ) : (
            <ReviewForm
              selectedShop={selectedShop}
              setReviewFormVisible={setReviewFormVisible}
            />
          )}
        </>
      )}
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  bottomSheetContent: {
    padding: 20,
    alignItems: "center",
  },
  shopHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  shopName: {
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
  },
  shopAddress: {
    fontSize: 14,
    marginTop: 5,
  },
  distance: {
    fontSize: 14,
    color: "gray",
  },
  photo: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginVertical: 5,
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 20,
    alignItems: "center",
  },
  toggleReviewForm: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    width: 300,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#0366d6",
  },
  toggleReviewFormText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default React.memo(CoffeeShopBottomSheet);
