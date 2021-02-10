import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

export const MapLoader = () => {
  const { status, error } = useSelector((state) => state.spots);
  const isLoading = status === "loading";

  return (
    (isLoading || error) && (
      <Container>
        <h1>{isLoading ? "loading" : error}</h1>
      </Container>
    )
  );
};

const Container = styled.div`
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 12px;
  border-radius: 8px;
  background: #ffffff;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 6px 16px;
`;
