import React from "react";
import styled from "styled-components";

import { SpotPhotos } from "pages/Explore/Spots/SpotPhotos";

export const MapPopup = ({ spot }) => (
  <Container>
    <SpotPhotos spot={spot} />
    <Content>
      <h1>{spot.name}</h1>
    </Content>
  </Container>
);

const Container = styled.div`
  width: 300px;
  padding: 6px;
`;

const Content = styled.div`
  margin-top: 12px;
`;
