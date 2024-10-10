import axios from "axios";
import { FOURSQUARE_BASE_URL, headers } from "./foursquareConfig";

const fetchCoffeeShops = async (latitude, longitude) => {
  try {
    const response = await axios.get(`${FOURSQUARE_BASE_URL}`, {
      headers,
      params: {
        ll: `${latitude},${longitude}`,
        query: "coffee",
        radius: 5000,
        limit: 30,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching coffee shops:", error);
    return [];
  }
};

export default fetchCoffeeShops;
