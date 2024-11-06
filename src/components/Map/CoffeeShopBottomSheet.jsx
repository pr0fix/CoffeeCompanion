import React, { useState } from "react";
import { Text, StyleSheet, Image, Pressable, View } from "react-native";
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useUser } from "../../contexts/UserContext";
import useHandleFavorites from "../../hooks/useHandleFavorites";
import ReviewForm from "../Review/ReviewForm";
import ShopHeader from "./ShopHeader";
import ReviewsList from "../Review/ReviewsList";

// Component for displaying photos section
const PhotoSection = ({ photos }) => (
  <View>
    <Text style={styles.sectionHeader}>Photos</Text>
    {photos && photos.length > 0 ? (
      photos.map((photo) => (
        <Image
          key={photo.id}
          source={{ uri: photo.url }}
          style={styles.photo}
        />
      ))
    ) : (
      <Text style={styles.noDataText}>
        No photos available for this coffee shop.
      </Text>
    )}
  </View>
);

// Component for displaying reviews section
const ReviewSection = ({ reviews }) => (
  <View>
    <Text style={styles.sectionHeader}>Reviews</Text>
    <ReviewsList
      reviews={reviews}
      shopSelected={true}
      emptyMessage="No reviews available for this coffee shop."
    />
  </View>
);

// Component for footer with a togglable review form
const ListFooter = ({
  user,
  selectedShop,
  reviewFormVisible,
  setReviewFormVisible,
}) =>
  user ? (
    reviewFormVisible ? (
      <ReviewForm
        selectedShop={selectedShop}
        setReviewFormVisible={setReviewFormVisible}
      />
    ) : (
      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.toggleReviewForm}
          onPress={() => setReviewFormVisible(true)}
        >
          <Text style={styles.toggleReviewFormText}>Write a review</Text>
        </Pressable>
      </View>
    )
  ) : (
    <View style={styles.noAccessContainer}>
      <Text style={styles.noAccessText}>
        Please sign in to see and write reviews.
      </Text>
    </View>
  );

// CoffeeShopBottomSheet component
const CoffeeShopBottomSheet = ({
  selectedShop,
  bottomSheetRef,
  snapPoints,
}) => {
  const [reviewFormVisible, setReviewFormVisible] = useState(false);
  const { user, reviews, favorites } = useUser();
  const { handleAddFavorite, handleRemoveFavorite } = useHandleFavorites();

  // Filtered reviews for the selected shop
  const filteredReviews = reviews.filter(
    (review) => review?.shopId === selectedShop?.fsq_id
  );

  // Check if the selected shop is in the user's favorites
  const isFavorite = favorites?.some(
    (favorite) => favorite.id === selectedShop?.fsq_id
  );

  // Function to handle adding/removing the shop from favorites
  const handleFavoritePress = async () => {
    if (isFavorite) {
      await handleRemoveFavorite(user.uid, selectedShop.fsq_id);
    } else {
      await handleAddFavorite(
        user.uid,
        selectedShop.fsq_id,
        selectedShop.name,
        selectedShop.location.address
      );
    }
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      enablePanDownToClose
      keyboardBehavior="interactive"
      keyboardBlurBehavior="restore"
      backgroundStyle={styles.bottomSheet}
    >
      {selectedShop && (
        <>
          <BottomSheetView style={styles.bottomSheetHeader}>
            <ShopHeader
              selectedShop={selectedShop}
              user={user}
              isFavorite={isFavorite}
              onPressFavoriteButton={handleFavoritePress}
            />
          </BottomSheetView>
          <BottomSheetFlatList
            data={[
              { type: "photos", data: selectedShop.photos },
              { type: "reviews", data: filteredReviews },
            ]}
            renderItem={({ item }) =>
              item.type === "photos" ? (
                <PhotoSection photos={item.data} />
              ) : (
                <ReviewSection reviews={item.data} />
              )
            }
            keyExtractor={(item, index) => item.type + index}
            ListFooterComponent={
              <ListFooter
                user={user}
                selectedShop={selectedShop}
                reviewFormVisible={reviewFormVisible}
                setReviewFormVisible={setReviewFormVisible}
              />
            }
          />
        </>
      )}
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  bottomSheet: {
    backgroundColor: "#F4ECE3",
  },
  bottomSheetHeader: {
    padding: 20,
    alignItems: "center",
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    marginLeft: 20,
    marginTop: 20,
    color: "#6F3E37",
  },
  photo: {
    width: "100%",
    height: 300,
    borderRadius: 10,
    marginVertical: 5,
  },
  noDataText: {
    marginVertical: 5,
    fontStyle: "italic",
    textAlign: "center",
    color: "#BDB3A0",
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
    backgroundColor: "#A87544",
  },
  toggleReviewFormText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  noAccessContainer: {
    alignItems: "center",
  },
  noAccessText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    fontStyle: "italic",
    marginVertical: 10,
    color: "#BDB3A0",
  },
});

export default React.memo(CoffeeShopBottomSheet);
