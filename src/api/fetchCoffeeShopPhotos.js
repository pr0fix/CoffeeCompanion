import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FOURSQUARE_BASE_URL, headers } from "./foursquareConfig";

// Constants
const CACHE_PREFIX = "photos_";
const CACHE_EXPIRATION_TIME = 24 * 60 * 60 * 1000;
const PHOTO_SIZE = "original";
const CLASSIFICATIONS = "outdoor,food";

// Helper function to get cached photos for a coffee shop
const getCachedPhotos = async (shopId) => {
  try {
    const cachedData = await AsyncStorage.getItem(`${CACHE_PREFIX}${shopId}`);
    if (cachedData != null) {
      const { photos, timestamp } = JSON.parse(cachedData);
      if (Date.now() - timestamp < CACHE_EXPIRATION_TIME) {
        return photos;
      } else {
        await AsyncStorage.removeItem(`${CACHE_PREFIX}${shopId}`);
      }
    }
    return null;
  } catch (error) {
    console.error(`Error fetching cached photos for shopId ${shopId}:`, error);
    return null;
  }
};

// Helper function to cache photos for a coffee shop
const cachePhotos = async (shopId, photos) => {
  try {
    const cacheKey = `${CACHE_PREFIX}${shopId}`;
    const currentTime = new Date().getTime();
    await AsyncStorage.setItem(
      cacheKey,
      JSON.stringify({ photos, timestamp: currentTime })
    );
  } catch (error) {
    console.error(`Error caching photos for shopId ${shopId}:`, error);
  }
};

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

    if (response.data && response.data.length > 0) {
      const photos = response.data.map((photo) => ({
        id: photo.id,
        url: `${photo.prefix}${PHOTO_SIZE}${photo.suffix}`,
        createdAt: photo.created_at,
      }));

      await cachePhotos(shopId, photos);
      return photos;
    }
    await cachePhotos(shopId, []);
    return [];
  } catch (error) {
    if (error.response && error.response.status !== 404) {
      console.warn(`Error fetching photos for shopId ${shopId}:`, error);
    }
    await cachePhotos(shopId, []);
    return [];
  }
};

export default fetchCoffeeShopPhotos;
