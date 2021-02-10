import axios from "axios";

const base = "http://localhost:3005/spot";

export const getSpot = async (id) => {
  try {
    const spot = await axios.get(`${base}/${id}`);
    return spot.data;
  } catch (error) {
    throw error;
  }
};

export const getSpots = async (query, setSpots) => {
  try {
    const spots = await axios.get(`${base}?${query}`);
    if (setSpots) {
      setSpots(spots.data);
    } else {
      return spots.data;
    }
  } catch (error) {
    throw error;
  }
};

export const createSpot = async (spot) => {
  try {
    const newSpot = await axios.post(base, { spot });
    return newSpot.data;
  } catch (error) {
    throw error;
  }
};

export const updateSpot = async (spot) => {
  try {
    const updatedSpot = await axios.put(`${base}/${spot.id}`, { spot });
    return updatedSpot.data;
  } catch (error) {
    throw error;
  }
};

export const deleteSpot = async (id) => {
  try {
    await axios.delete(`${base}/${id}`);
  } catch (error) {
    throw error;
  }
};

export const getCategories = async (setCategories) => {
  try {
    const categories = await axios.get(`${base}/categories`);
    setCategories(categories.data);
  } catch (error) {
    setCategories(null);
  }
};
