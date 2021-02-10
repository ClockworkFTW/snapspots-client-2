import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSun,
  faMoon,
  faCloudSun,
  faCloudMoon,
  faCloud,
  faCloudsSun,
  faCloudsMoon,
  faCloudShowers,
  faCloudSunRain,
  faCloudMoonRain,
  faThunderstorm,
  faSnowflake,
  faFog,
  faSunrise,
  faSunset,
} from "@fortawesome/pro-light-svg-icons";

export const WeatherIcon = ({ icon, size, color }) => {
  const getIcon = () => {
    switch (icon) {
      case "01d":
        return faSun;
      case "01n":
        return faMoon;
      case "02d":
        return faCloudSun;
      case "02n":
        return faCloudMoon;
      case "03d":
        return faCloud;
      case "03n":
        return faCloud;
      case "04d":
        return faCloudsSun;
      case "04n":
        return faCloudsMoon;
      case "09d":
        return faCloudShowers;
      case "09n":
        return faCloudShowers;
      case "10d":
        return faCloudSunRain;
      case "10n":
        return faCloudMoonRain;
      case "11d":
        return faThunderstorm;
      case "11n":
        return faThunderstorm;
      case "13d":
        return faSnowflake;
      case "13n":
        return faSnowflake;
      case "50d":
        return faFog;
      case "50n":
        return faFog;
      case "cloud":
        return faCloud;
      case "sunrise":
        return faSunrise;
      case "sunset":
        return faSunset;
      default:
        return faSun;
    }
  };

  return (
    <FontAwesomeIcon
      icon={getIcon()}
      size={size}
      color={color}
      style={{ margin: "16px 0" }}
    />
  );
};
