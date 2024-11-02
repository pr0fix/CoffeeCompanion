import React, { useState } from "react";
import { Text, StyleSheet, Image, Pressable, View } from "react-native";
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import ReviewForm from "./ReviewForm";
import FavoriteButton from "./FavoriteButton";
import { useUser } from "../contexts/UserContext";
import ReviewItem from "./ReviewItem";
import useHandleFavorites from "../hooks/useHandleFavorites";
import formatDistance from "../utils/formatDistance";

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

// Renders a photo item as an Image component.
const renderPhotoItem = ({ item }) => (
  <Image key={item.id} source={{ uri: item.url }} style={styles.photo} />
);

// Renders the photo or review items based on their type.
const renderReviewItem = ({ item, user }) => {
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
        {user &&
          (item.data && item.data.length > 0 ? (
            item.data.map((review) => (
              <ReviewItem item={review} key={review.id} shopSelected={true} />
            ))
          ) : (
            <Text style={styles.noDataText}>
              No reviews available for this coffee shop.
            </Text>
          ))}
      </View>
    );
  }
  return null;
};

// Renders the footer for the bottom sheet with a button to toggle review form or a message to sign in.
const ListFooterComponent = ({
  user,
  selectedShop,
  reviewFormVisible,
  setReviewFormVisible,
}) => {
  return user ? (
    !reviewFormVisible ? (
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
    )
  ) : (
    <View style={styles.noAccessContainer}>
      <Text style={styles.noAccessText}>
        Please sign in to see and write reviews.
      </Text>
    </View>
  );
};

// Bottom sheet component
const CoffeeShopBottomSheet = ({
  selectedShop,
  bottomSheetRef,
  snapPoints,
}) => {
  const [reviewFormVisible, setReviewFormVisible] = useState(false);
  const { user, reviews, favorites } = useUser();
  const { handleAddFavorite, handleRemoveFavorite } = useHandleFavorites();

  // Filters reviews so that each coffee shops bottom sheet will have only reviews related to it visible
  const filteredReviews = reviews.filter(
    (review) => review?.shopId === selectedShop?.fsq_id
  );

  // Check if coffee shop is in user favorites to pass it to FavoriteButton component
  const isFavorite = favorites?.some(
    (favorite) => favorite.id === selectedShop?.fsq_id
  );

  // onPress function handler which checks if coffee shop is in user favorites or not and acts correspondingly
  const onPressFavoriteButton = async () => {
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
      enablePanDownToClose={true}
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
              onPressFavoriteButton={onPressFavoriteButton}
            />
          </BottomSheetView>
          <BottomSheetFlatList
            data={[
              { type: "photos", data: selectedShop.photos },
              { type: "reviews", data: filteredReviews },
            ]}
            renderItem={({ item }) => renderReviewItem({ item, user })}
            keyExtractor={(item, index) => item.type + index}
            ListFooterComponent={
              <ListFooterComponent
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
