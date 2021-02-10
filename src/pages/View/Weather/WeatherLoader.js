import React from "react";
import ContentLoader from "react-content-loader";
import styled from "styled-components";

export const WeatherLoader = ({ count, width, height }) => (
  <Wrapper>
    {[...Array(count)].map((e, i) => (
      <Container key={i} width={width} height={height}>
        <ContentLoader viewBox="0 0 120 150">
          <rect x="0" y="0" width="120" height="150" />
        </ContentLoader>
      </Container>
    ))}
  </Wrapper>
);

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Container = styled.div`
  width: 120px;
  height: 150px;
  border-radius: 8px;
  overflow: hidden;
`;
