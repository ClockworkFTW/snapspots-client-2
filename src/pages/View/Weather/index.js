import React, { useState, useEffect } from "react";
import { faClock } from "@fortawesome/pro-light-svg-icons";
import styled from "styled-components";

import * as openweather from "services/openweather.js";
import { WeatherLoader } from "./WeatherLoader";
import { WeatherCard } from "./WeatherCard";
import { ButtonAction } from "components/Button";

export const Weather = ({ lat, lng }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    openweather.getForecast({ lat, lng }, setWeather);
  }, [lat, lng]);

  const [int, setInt] = useState("daily");

  const toggleInt = () => setInt(int === "daily" ? "hourly" : "daily");

  return (
    <>
      <Header>
        Weather
        {weather && (
          <ButtonAction
            onClick={toggleInt}
            icon={faClock}
            color="#60A5FA"
            size="14px"
            margin="0 0 0 12px"
          >
            {int}
          </ButtonAction>
        )}
      </Header>
      {weather ? (
        <Wrapper>
          {weather[int].map(
            (weather, i) =>
              i < 7 && <WeatherCard key={i} weather={weather} int={int} />
          )}
        </Wrapper>
      ) : (
        <WeatherLoader count={8} />
      )}
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Header = styled.h1`
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: 700;
`;
