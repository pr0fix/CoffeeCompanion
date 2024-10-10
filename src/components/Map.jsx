import { useEffect, useState } from "react";
import { Alert, Linking, StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import fetchCoffeeShops from "../api/fetchCoffeeShops";

const Map = () => {
  const [region, setRegion] = useState({
    latitude: 60.170675,
    longitude: 24.941488,
    latitudeDelta: 0.0322,
    longitudeDelta: 0.0221,
  });
  const [coffeeShops, setCoffeeShops] = useState([]);

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

      setCoffeeShops(shops);
    } catch (err) {
      console.error("Error fetching location", err);
    }
  };

  // Fetch coffee shops and user location on component mount
  useEffect(() => {
    getCoffeeShops();
  }, []);

  // Return map with user and coffee shops nearby
  return (
    <View>
      <MapView
        style={styles.map}
        loadingEnabled={true}
        region={region}
        showsUserLocation={true}
      >
        {coffeeShops.map((shop, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: shop.geocodes.main.latitude,
              longitude: shop.geocodes.main.longitude,
            }}
            title={shop.name}
            description={shop.location.address || "No address available"}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    height: "100%",
    width: "100%",
  },
});

export default Map;
