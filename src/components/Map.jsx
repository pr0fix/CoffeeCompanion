import { useEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import MapView from "react-native-maps";
import * as Location from "expo-location";

const Map = () => {
  // Initial mapview region
  const [region, setRegion] = useState({
    latitude: 60.200692,
    longitude: 24.934302,
    latitudeDelta: 0.0322,
    longitudeDelta: 0.0221,
  });

  // Fetch user location on component mount
  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          Alert.alert("No permission to get location");
          return;
        }
        const location = await Location.getCurrentPositionAsync();
        setRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0322,
          longitudeDelta: 0.0221,
        });
      } catch (err) {
        console.error("Error fetching location", err);
      }
    })();
  }, []);

  // Return map with user and coffee shops
  return (
    <View>
      <MapView
        style={styles.map}
        loadingEnabled={true}
        region={region}
        showsUserLocation={true}
      ></MapView>
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
