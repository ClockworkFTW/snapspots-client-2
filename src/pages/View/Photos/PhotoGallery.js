import React from "react";
import styled from "styled-components";

export const PhotoGallery = ({ name, photos, toggle }) => (
  <Container>
    <Photo alt={`${name} photo 1`} src={photos[0]} />
    <Grid>
      <Photo alt={`${name} photo 2`} src={photos[1]} />
      <Photo alt={`${name} photo 3`} src={photos[2]} />
      <Photo alt={`${name} photo 4`} src={photos[3]} />
      <Photo alt={`${name} photo 5`} src={photos[4]} />
    </Grid>
    <Button onClick={toggle}>See All Photos</Button>
  </Container>
);

const Container = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  height: 600px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  width: 100%;
  height: 100%;
`;

const Photo = styled.img`
  width: 100%;
  height: 100%;
  border: 10px solid #ffffff;
  border-radius: 20px;
  object-fit: cover;
  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;

const Button = styled.button`
  position: absolute;
  bottom: 40px;
  right: 40px;
`;
