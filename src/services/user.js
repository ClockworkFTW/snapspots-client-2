import axios from "axios";

const base = "http://localhost:3005/user";

export const getUser = async (id) => {
  try {
    const user = await axios.get(`${base}/${id}`);
    return user.data;
  } catch (error) {
    throw error;
  }
};
