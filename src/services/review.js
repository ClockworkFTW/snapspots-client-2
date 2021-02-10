import axios from "axios";

const base = "http://localhost:3005/review";

export const createReview = async (review, setReviews) => {
  try {
    const updatedSpot = await axios.post(base, { review });
    return updatedSpot.data;
  } catch (error) {
    throw error;
  }
};
