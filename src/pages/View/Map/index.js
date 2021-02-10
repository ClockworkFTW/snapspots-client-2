import React from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import { faMapMarkerAlt } from "@fortawesome/pro-light-svg-icons";
import styled from "styled-components";

import { ButtonAction } from "components/Button";

const TOKEN =
  "pk.eyJ1IjoiY2xvY2t3b3JrZnR3IiwiYSI6ImNrY2N1NWg5eTAxOXAyeW1zYTBrd2pld20ifQ.5ju7KcQ3gbm8Mgu2FOd8Hg";

export const Map = ({ width, height, lat, lng }) => (
  <>
    <Header>
      Location
      <ButtonAction
        href={`https://www.google.com/maps/@${lat},${lng},15z`}
        icon={faMapMarkerAlt}
        margin="0 0 0 12px"
      >
        explore
      </ButtonAction>
    </Header>
    <Container width={width} height={height}>
      <ReactMapGL
        mapboxApiAccessToken={TOKEN}
        latitude={lat}
        longitude={lng}
        zoom={15}
        width="100%"
        height="100%"
      >
        <Marker latitude={lat} longitude={lng}>
          <Point />
        </Marker>
      </ReactMapGL>
    </Container>
  </>
);

const Header = styled.h1`
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: 700;
`;

const Container = styled.div`
  display: block;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  border-radius: 8px;
  overflow: hidden;
`;

const Point = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid #ffffff;
  border-radius: 50%;
  background: red;
`;
