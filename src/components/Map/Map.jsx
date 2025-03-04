import React, { useEffect, useMemo, useRef, useState } from "react";
import { Alert, Linking, SafeAreaView, StyleSheet, View } from "react-native";
import { Marker } from "react-native-maps";
import MapView from "react-native-map-clustering";
import * as Location from "expo-location";
import Icon from "react-native-vector-icons/FontAwesome";
import fetchCoffeeShops from "../../api/fetchCoffeeShops";
import fetchCoffeeShopPhotos from "../../api/fetchCoffeeShopPhotos";
import CoffeeShopBottomSheet from "./CoffeeShopBottomSheet";
import { useNotification } from "../../contexts/NotificationContext";
import {
  getUserLocation,
  requestLocationPermission,
} from "../../utils/getUserLocation";

// Removes any default POIs and markings that come with Google Maps
const customMapStyle = [
  {
    featureType: "poi",
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "transit",
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "road",
    elementType: "labels.icon",
    stylers: [{ visibility: "off" }],
  },
];

// Initial region for the map
const initialRegion = {
  latitude: 60.170675,
  longitude: 24.941488,
  latitudeDelta: 0.0322,
  longitudeDelta: 0.0221,
};

// Fetch coffee shops with photos from the Foursquare API
const getCoffeeShopsWithPhotos = async (latitude, longitude) => {
  const shops = await fetchCoffeeShops(latitude, longitude);
  if (shops) {
    return Promise.all(
      shops.map(async (shop) => {
        const photos = await fetchCoffeeShopPhotos(shop.fsq_id);
        return { ...shop, photos };
      })
    );
  }
};

// Map component
const Map = () => {
  const { addNotification } = useNotification();
  const [region, setRegion] = useState(initialRegion);
  const [coffeeShops, setCoffeeShops] = useState([]);
  const [selectedShop, setSelectedShop] = useState(null);
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["25%", "50%", "75%"], []);

  // Fetch user location and coffee shops with photos on component mount
  useEffect(() => {
    let locationSubscription;

    const fetchData = async () => {
      try {
        const hasPermission = await requestLocationPermission();
        if (!hasPermission) return;

        const userLocation = await getUserLocation();
        setRegion({
          ...userLocation,
          latitudeDelta: 0.0322,
          longitudeDelta: 0.0221,
        });

        const shopsWithPhotos = await getCoffeeShopsWithPhotos(
          userLocation.latitude,
          userLocation.longitude
        );
        setCoffeeShops(shopsWithPhotos);

        locationSubscription = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            distanceInterval: 10,
          },
          async (newLocation) => {
            const { latitude, longitude } = newLocation.coords;
            setRegion({
              latitude,
              longitude,
              latitudeDelta: 0.0322,
              longitudeDelta: 0.0221,
            });

            const updatedShopsWithPhotos = await getCoffeeShopsWithPhotos(
              latitude,
              longitude
            );
            setCoffeeShops(updatedShopsWithPhotos);
          }
        );
      } catch (err) {
        console.error("Error fetching location or coffee shops", err);
        addNotification("Error fetching location or coffee shops", "error");
      }
    };

    fetchData();

    // Clean up location subscription on unmount
    return () => {
      if (locationSubscription) {
        locationSubscription.remove();
      }
    };
  }, []);

  // Handle marker press to show the bottom sheet
  const handleMarkerPress = (shop) => {
    setSelectedShop(shop);
    if (shop) {
      bottomSheetRef.current.snapToIndex(0);
    }
  };

  // Create markers for each coffee shop
  const coffeeShopMarkers = coffeeShops.map((shop) => (
    <Marker
      key={shop.fsq_id}
      coordinate={{
        latitude: shop.geocodes.main.latitude,
        longitude: shop.geocodes.main.longitude,
      }}
      title={shop.name}
      description={shop.location.address || "No address available"}
      onPress={() => handleMarkerPress(shop)}
      tracksViewChanges={false}
    >
      <View style={styles.markerContainer}>
        <Icon
          name="coffee"
          style={styles.markerIcon}
          size={15}
          color="#FFFFFF"
        />
      </View>
    </Marker>
  ));

  // Render the map with coffee shop markers and the bottom sheet
  return (
    <SafeAreaView>
      <View>
        <MapView
          style={styles.map}
          customMapStyle={customMapStyle}
          provider="google"
          loadingEnabled={true}
          region={region}
          showsUserLocation={true}
          toolbarEnabled={false}
          clusterColor="#A87544"
        >
          {coffeeShopMarkers}
        </MapView>
      </View>
      <CoffeeShopBottomSheet
        selectedShop={selectedShop}
        bottomSheetRef={bottomSheetRef}
        snapPoints={snapPoints}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  map: {
    height: "100%",
    width: "100%",
  },
  markerContainer: {
    backgroundColor: "#6F3E37",
    padding: 8,
    borderRadius: 25,
  },
  markerIcon: {
    alignSelf: "center",
  },
});

export default Map;
