import React, { useMemo, useRef } from "react";
import { Image, StyleSheet, Text } from "react-native";
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetView,
} from "@gorhom/bottom-sheet";

const formatDistance = (distance) => {
  return distance >= 1000
    ? (distance / 1000).toFixed(1) + " km"
    : distance.toString() + " m";
};

const CoffeeShopBottomSheet = ({
  selectedShop,
  bottomSheetRef,
  snapPoints,
}) => {
  const renderPhotoItem = ({ item }) => (
    <Image key={item.id} source={{ uri: item.url }} style={styles.photo} />
  );

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
            <Text style={styles.shopName}>{selectedShop.name}</Text>
            <Text style={styles.address}>
              {selectedShop.location.address || "No address available"}
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
        </>
      )}
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  bottomSheetContent: {
    padding: 20,
  },
  shopName: {
    fontSize: 18,
    fontWeight: "bold",
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
});

export default CoffeeShopBottomSheet;
