import axios from "axios";
import { FOURSQUARE_BASE_URL, headers } from "./foursquareConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Constants
const CACHE_PREFIX = "photos_";
const PHOTO_SIZE = 960;
const CLASSIFICATIONS = "outdoor,food";

// Fetch coffee shops from Foursquare Places API
const fetchCoffeeShopPhotos = async (shopId) => {
  try {
    const cachedPhotos = await getCachedPhotos(shopId);
    if (cachedPhotos) {
      return cachedPhotos;
    }

    // Fetch photos from Foursquare API
    const response = await axios.get(
      `${FOURSQUARE_BASE_URL}/${shopId}/photos`,
      {
        headers,
        params: { classifications: CLASSIFICATIONS },
      }
    );

    const photos = response.data.map((photo) => ({
      id: photo.id,
      url: `${photo.prefix}${PHOTO_SIZE}${photo.suffix}`,
      createdAt: photo.created_at,
    }));

    await cachePhotos(shopId, photos);
    return photos;
  } catch (error) {
    return [];
  }
};

// Helper function to get cached photos for a coffee shop
const getCachedPhotos = async (shopId) => {
  try {
    const cachedData = await AsyncStorage.getItem(`${CACHE_PREFIX}${shopId}`);
    return cachedData ? JSON.parse(cachedData) : null;
  } catch (error) {
    console.error(`Error fetching cached photos for shopId ${shopId}:`, error);
    return null;
  }
};

// Helper function to cache photos for a coffee shop
const cachePhotos = async (shopId, photos) => {
  try {
    await AsyncStorage.setItem(
      `${CACHE_PREFIX}${shopId}`,
      JSON.stringify(photos)
    );
  } catch (error) {
    console.error(`Error caching photos for shopId ${shopId}:`, error);
  }
};

export default fetchCoffeeShopPhotos;
