import axios from "axios";

const base = "http://localhost:3005/auth";

export const signUp = async (credentials) => {
  try {
    const user = await axios.post(`${base}/sign-up`, { credentials });
    return user.data.token;
  } catch (error) {
    console.log(error.response.message);
    throw error;
  }
};

export const signIn = async (credentials) => {
  try {
    const user = await axios.post(`${base}/sign-in`, { credentials });
    return user.data.token;
  } catch (error) {
    throw error;
  }
};
