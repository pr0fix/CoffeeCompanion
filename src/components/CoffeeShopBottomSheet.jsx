import React, { useState } from "react";
import { Text, StyleSheet, Image, Pressable, View } from "react-native";
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetView,
} from "@gorhom/bottom-sheet";

import ReviewForm from "./ReviewForm";
import FavoriteButton from "./FavoriteButton";
import { useAuth } from "../contexts/AuthContext";
import ReviewItem from "./ReviewItem";

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
  const { reviews } = useAuth();

  const filteredReviews = reviews.filter(
    (review) => review?.shopId === selectedShop?.fsq_id
  );

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
    >
      {selectedShop && (
        <>
          <BottomSheetView style={styles.bottomSheetContent}>
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
              <FavoriteButton />
            </View>
          </BottomSheetView>
          <BottomSheetFlatList
            data={[
              { type: "photos", data: selectedShop.photos },
              { type: "reviews", data: filteredReviews },
            ]}
            renderItem={({ item }) => {
              if (item.type === "photos") {
                return (
                  <View>
                    <Text style={styles.sectionHeader}>Photos</Text>
                    {item.data && item.data.length > 0 ? (
                      item.data.map((photo) => renderPhotoItem({ item: photo }))
                    ) : (
                      <Text style={styles.noDataText}>
                        No photos available for this coffee shop.
                      </Text>
                    )}
                  </View>
                );
              } else if (item.type === "reviews") {
                return (
                  <View>
                    <Text style={styles.sectionHeader}>Reviews</Text>
                    {item.data && item.data.length > 0 ? (
                      item.data.map((review) => (
                        <ReviewItem item={review} key={review.id} />
                      ))
                    ) : (
                      <Text style={styles.noDataText}>
                        No reviews available for this coffee shop.
                      </Text>
                    )}
                  </View>
                );
              }
            }}
            keyExtractor={(item, index) => item.type + index}
            ListFooterComponent={
              !reviewFormVisible ? (
                <View style={styles.buttonContainer}>
                  <Pressable
                    style={styles.toggleReviewForm}
                    onPress={() => setReviewFormVisible(true)}
                  >
                    <Text style={styles.toggleReviewFormText}>
                      Write a review
                    </Text>
                  </Pressable>
                </View>
              ) : (
                <ReviewForm
                  selectedShop={selectedShop}
                  setReviewFormVisible={setReviewFormVisible}
                />
              )
            }
          />
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
  sectionHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    marginLeft: 20,
    marginTop: 20,
  },
  shopHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  shopName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  shopAddress: {
    fontSize: 16,
    fontStyle: "italic",
    color: "gray",
  },
  distance: {
    fontSize: 16,
    color: "gray",
  },
  photo: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginVertical: 5,
  },
  noDataText: {
    marginVertical: 5,
    fontStyle: "italic",
    textAlign: "center",
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
