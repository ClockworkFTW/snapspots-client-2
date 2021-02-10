import React, { useState } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import styled from "styled-components";

import { MapSearch } from "./MapSearch";

const TOKEN =
  "pk.eyJ1IjoiY2xvY2t3b3JrZnR3IiwiYSI6ImNrY2N1NWg5eTAxOXAyeW1zYTBrd2pld20ifQ.5ju7KcQ3gbm8Mgu2FOd8Hg";

export const Map = ({ isEditing, width, height, data, setData }) => {
  const [viewport, setViewport] = useState({
    latitude: data.lat,
    longitude: data.lng,
    zoom: 0,
  });

  const onViewportChange = (v) => setViewport(v);

  const onClick = (e) => {
    if (!isEditing || viewport.zoom < 15) return;
    const [lng, lat] = e.lngLat;
    setData({ ...data, lng, lat });
  };

  return (
    <Wrapper>
      {isEditing && <MapSearch viewport={viewport} setViewport={setViewport} />}
      <Container width={width} height={height}>
        {isEditing && viewport.zoom < 15 && (
          <Notification>Please zoom in more</Notification>
        )}
        <ReactMapGL
          mapboxApiAccessToken={TOKEN}
          {...viewport}
          width="100%"
          height="100%"
          onViewportChange={onViewportChange}
          onClick={onClick}
        >
          <Marker latitude={data.lat} longitude={data.lng}>
            <Point />
          </Marker>
        </ReactMapGL>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const Container = styled.div`
  position: relative;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  border-radius: 8px;
  overflow: hidden;
`;

const Notification = styled.div`
  z-index: 10;
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 20px;
  background: #ffffff;
  border-radius: 8px;
`;

const Point = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid #ffffff;
  border-radius: 50%;
  background: red;
`;
