import { Text, View, StyleSheet, Image } from "react-native";
import { useRoute } from "@react-navigation/native";
import DEFAULT_IMAGE from "../../../assets/coffee-placeholder.jpg";

const ShopDetails = () => {
  const route = useRoute();
  const shop = route.params?.shop;

  if (!shop) return <Text>404 no coffee shop found...</Text>;

  const photos = shop.photos.map((photo) => ({
    id: photo.id,
    url: photo.url,
  }));

  return (
    <View style={styles.detailsContainer}>
      {photos && photos.length > 0 ? (
        <Image style={styles.photo} source={{ uri: photos[0].url }} />
      ) : (
        <Image style={styles.photo} source={DEFAULT_IMAGE} />
      )}
      <Text>{shop.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  detailsContainer: {
    flex: 1,
    backgroundColor: "#F4ECE3",
  },
  photo: {
    width: "100%",
    height: 300,
    marginVertical: 5,
  },
});

export default ShopDetails;
