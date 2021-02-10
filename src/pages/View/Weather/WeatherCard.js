import React, { useState } from "react";
import moment from "moment";
import styled from "styled-components";

import { WeatherIcon } from "./WeatherIcon";

export const WeatherCard = ({ weather, int }) => {
  const [toggle, setToggle] = useState(false);

  const { icon } = weather.weather[0];

  const color = () => {
    if (icon[2] === "d") return "#FBBF24";
    if (icon[2] === "n") return "#60A5FA";
  };

  const time = moment(weather.dt * 1000).format(
    int === "daily" ? "dddd" : "h A"
  );

  const temp = () => {
    const { max, min } = weather.temp;
    if (int === "daily") {
      return `${Math.round(max)} / ${Math.round(min)}`;
    }
    if (int === "hourly") {
      return weather.temp.toFixed(1);
    }
  };

  const cloudPercentage = weather.clouds;

  const cloudIntensity = () => {
    if (cloudPercentage < 25) return "Low";
    if (cloudPercentage >= 25 && cloudPercentage <= 75) return "Med";
    if (cloudPercentage > 75) return "High";
  };

  const sunrise = moment(weather.sunrise * 1000).format("h:mm A");
  const sunset = moment(weather.sunset * 1000).format("h:mm A");

  return (
    <div
      onMouseEnter={() => setToggle(true)}
      onMouseLeave={() => setToggle(false)}
    >
      {int === "daily" && !toggle && (
        <TempCard time={time} icon={icon} color={color()} temp={temp()} />
      )}
      {int === "daily" && toggle && (
        <DaylightCard
          time={time}
          color="#FBBF24"
          sunrise={sunrise}
          sunset={sunset}
        />
      )}
      {int === "hourly" && !toggle && (
        <TempCard time={time} icon={icon} color={color()} temp={temp()} />
      )}
      {int === "hourly" && toggle && (
        <CloudCard
          time={time}
          color={color()}
          cloudPercentage={cloudPercentage}
          cloudIntensity={cloudIntensity()}
        />
      )}
    </div>
  );
};

const TempCard = ({ time, icon, color, temp }) => (
  <Container>
    <Text>{time}</Text>
    <WeatherIcon icon={icon} size="3x" color={color} />
    <Text>{temp} &deg;F</Text>
  </Container>
);

const CloudCard = ({ time, color, cloudPercentage, cloudIntensity }) => (
  <Container>
    <Text>{time}</Text>
    <WeatherIcon icon="cloud" size="3x" color={color} />
    <Center color={color}>{cloudPercentage}</Center>
    <Text>{cloudIntensity}</Text>
  </Container>
);

const DaylightCard = ({ time, sunrise, sunset }) => (
  <Container>
    <Text>{time}</Text>
    <WeatherIcon icon="sunrise" size="2x" color="#FBBF24" />
    <WeatherIcon icon="sunset" size="2x" color="#FBBF24" />
    <Text>
      {sunrise} {sunset}
    </Text>
  </Container>
);

const Container = styled.div`
  position: relative;
  width: 120px;
  height: 150px;
  padding: 20px;
  text-align: center;
  background: #f7f7f7;
  border-radius: 8px;
  color: #717171;
`;

const Text = styled.p`
  font-size: 14px;
`;

const Center = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -25%);
  font-weight: 700;
  color: ${({ color }) => color};
`;
