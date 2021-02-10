import React from "react";
import { NavigationControl } from "react-map-gl";
import styled from "styled-components";

export const MapNavigation = () => (
  <Container>
    <NavigationControl />
  </Container>
);

const Container = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 12px;
  border-radius: 8px;
  background: #ffffff;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 6px 16px;
`;
