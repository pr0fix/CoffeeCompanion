import { useEffect, useMemo, useRef, useState } from "react";
import { Alert, Linking, SafeAreaView, StyleSheet, View } from "react-native";
import { Marker } from "react-native-maps";
import MapView from "react-native-map-clustering";
import * as Location from "expo-location";
import fetchCoffeeShops from "../api/fetchCoffeeShops";
import fetchCoffeeShopPhotos from "../api/fetchCoffeeShopPhotos";
import CoffeeShopBottomSheet from "./CoffeeShopBottomSheet";

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

const Map = () => {
  const [region, setRegion] = useState({
    latitude: 60.170675,
    longitude: 24.941488,
    latitudeDelta: 0.0322,
    longitudeDelta: 0.0221,
  });
  const [coffeeShops, setCoffeeShops] = useState([]);
  const [selectedShop, setSelectedShop] = useState(null);
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["25%", "50%", "75%"], []);

  // Request user location permission
  const requestLocationPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status === "granted") {
      return true;
    }

    if (status === "denied") {
      Alert.alert(
        "Location Access Required",
        "Without location permissions, CoffeeCompanion won't be able to show nearby coffee shops on the map. Please enable location access in your settings.",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Open Settings",
            onPress: () => Linking.openSettings(),
          },
        ]
      );
    }
    return false;
  };

  // Fetch coffee shops
  const getCoffeeShops = async () => {
    try {
      const hasPermission = await requestLocationPermission();
      if (!hasPermission) return;

      const location = await Location.getCurrentPositionAsync();
      const userLocation = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setRegion({
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        latitudeDelta: 0.0322,
        longitudeDelta: 0.0221,
      });
      const shops = await fetchCoffeeShops(
        userLocation.latitude,
        userLocation.longitude
      );

      const shopsWithPhotos = await Promise.all(
        shops.map(async (shop) => {
          const photos = await fetchCoffeeShopPhotos(shop.fsq_id);
          return { ...shop, photos };
        })
      );

      setCoffeeShops(shopsWithPhotos);
    } catch (err) {
      console.error("Error fetching location", err);
    }
  };

  // Fetch coffee shops and user location on component mount
  useEffect(() => {
    getCoffeeShops();
  }, []);

  const handleMarkerPress = async (shop) => {
    setSelectedShop(shop);
    bottomSheetRef.current?.snapToIndex(1);
  };

  // Return map with user and coffee shops nearby
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
            />
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
});

export default Map;
