import axios from "axios";
import { FOURSQUARE_BASE_URL, headers } from "./foursquareConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Fetch coffee shops from Foursquare Places API
const fetchCoffeeShopPhotos = async (shopId) => {
  const cachedPhotos = await getCachedPhotos(shopId);
  if (cachedPhotos) {
    return cachedPhotos;
  }

  try {
    const response = await axios.get(
      `${FOURSQUARE_BASE_URL}/${shopId}/photos`,
      {
        headers,
        params: {
          classifications: "outdoor,food",
        },
      }
    );

    const photos = response.data.map((photo) => ({
      id: photo.id,
      url: `${photo.prefix}${photo.suffix}`,
      createdAt: photo.created_at,
    }));

    await cachePhotos(shopId, photos);
    return photos;
  } catch (error) {
    console.error("Error fetching coffee shops:", error);
    return [];
  }
};

const getCachedPhotos = async (shopId) => {
  try {
    const cachedData = await AsyncStorage.getItem(`photos_${shopId}`);
    return cachedData ? JSON.parse(cachedData) : null;
  } catch (error) {
    console.error("Error fetching cached photos", error);
    return null;
  }
};

const cachePhotos = async (shopId, photos) => {
  try {
    await AsyncStorage.setItem(`photos_${shopId}`, JSON.stringify(photos));
  } catch (error) {
    console.error("Error caching photos", error);
  }
};

export default fetchCoffeeShopPhotos;
