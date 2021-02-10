import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { SpotCard } from "./SpotCard";

export const Spots = () => {
  const spots = useSelector((state) => state.spots.entities);
  return (
    <Container>
      {spots.map((spot, i) => (
        <SpotCard key={i} spot={spot} />
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 20px;
`;
