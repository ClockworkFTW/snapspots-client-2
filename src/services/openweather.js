import axios from "axios";

import { sleep } from "helpers";

const CORS_PROXY = process.env.REACT_APP_CORS_PROXY;
const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;
const base = "https://api.openweathermap.org/data/2.5";

export const getForecast = async ({ lat, lng }, setWeather) => {
  const endpoint = "onecall";
  const exclude = "current,minutely,alerts";
  const units = "imperial";
  try {
    const result = await axios.get(
      `${CORS_PROXY}/${base}/${endpoint}?lat=${lat}&lon=${lng}&exclude=${exclude}&units=${units}&appid=${API_KEY}`
    );

    await sleep(2000);

    setWeather(result.data);
  } catch (error) {
    console.log(error);
  }
};
