import * as Location from "expo-location";
// Request location permissions from the user
export const requestLocationPermission = async () => {
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

export const getUserLocation = async () => {
  const location = await Location.getCurrentPositionAsync();
  return {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
  };
};
