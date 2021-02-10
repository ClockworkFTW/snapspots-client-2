import axios from "axios";

const CORS_PROXY = process.env.REACT_APP_CORS_PROXY;
const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
const base = "https://maps.googleapis.com/maps/api";

export const autocomplete = async (input, setPredictions) => {
  const endpoint = "place/autocomplete/json";
  try {
    const result = await axios.get(
      `${CORS_PROXY}/${base}/${endpoint}?key=${API_KEY}&input=${input}`
    );
    setPredictions(result.data.predictions);
  } catch (error) {
    console.log(error);
  }
};

export const geocode = async (placeId) => {
  const endpoint = "geocode/json";
  try {
    const result = await axios.get(
      `${CORS_PROXY}/${base}/${endpoint}?key=${API_KEY}&place_id=${placeId}`
    );
    return result.data.results[0].geometry.location;
  } catch (error) {
    console.log(error);
  }
};
