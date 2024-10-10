import { FOURSQUARE_API_KEY } from "@env";

export const FOURSQUARE_BASE_URL =
  "https://api.foursquare.com/v3/places/search";

export const headers = {
  accept: "application/json",
  Authorization: `${FOURSQUARE_API_KEY}`,
};
