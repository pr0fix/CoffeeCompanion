import axios from "axios";
import { FOURSQUARE_BASE_URL, headers } from "./foursquareConfig";

// Fetch coffee shops from Foursquare Places API
const fetchCoffeeShops = async (latitude, longitude) => {
  try {
    const response = await axios.get(`${FOURSQUARE_BASE_URL}/search`, {
      headers,
      params: {
        ll: `${latitude},${longitude}`,
        query: "coffee",
        radius: 2000,
        limit: 50,
        sort: "POPULARITY",
        // category id's from Foursquare Places API documentation for Cafes, Coffee, and Tea Houses & Coffee Shops
        categories: "63be6904847c3692a84b9bb6,4bf58dd8d48988d1e0931735",
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching coffee shops:", error);
    return [];
  }
};

export default fetchCoffeeShops;
