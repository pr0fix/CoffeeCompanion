import React, { useEffect, useMemo, useRef, useState } from "react";
import { Alert, Linking, SafeAreaView, StyleSheet, View } from "react-native";
import { Marker } from "react-native-maps";
import MapView from "react-native-map-clustering";
import * as Location from "expo-location";
import fetchCoffeeShops from "../api/fetchCoffeeShops";
import fetchCoffeeShopPhotos from "../api/fetchCoffeeShopPhotos";
import CoffeeShopBottomSheet from "./CoffeeShopBottomSheet";
import Icon from "react-native-vector-icons/FontAwesome";

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

// Request location permissions from the user
const requestLocationPermission = async () => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status === "granted") {
    return true;
  }

  if (status === "denied") {
    Alert.alert(
      "Location Access Required",
      "Without location permissions, CoffeeCompanion won't be able to show nearby coffee shops on the map. Please enable location access in your settings.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Open Settings", onPress: () => Linking.openSettings() },
      ]
    );
  }
  return false;
};

//  Get the user's current location
const getUserLocation = async () => {
  const location = await Location.getCurrentPositionAsync();
  return {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
  };
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
      }
    };

    fetchData();

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
          {coffeeShops.map((shop) => (
            <Marker
              key={shop.fsq_id}
              coordinate={{
                latitude: shop.geocodes.main.latitude,
                longitude: shop.geocodes.main.longitude,
              }}
              title={shop.name}
              description={shop.location.address || "No address available"}
              onPress={() => handleMarkerPress(shop)}
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
          ))}
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
