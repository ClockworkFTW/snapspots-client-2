import React from "react";
import styled from "styled-components";

import { Category } from "pages/Edit/Categories/Category";
import { Equipment } from "pages/Edit/Equipment";

export const Details = ({ spot }) => (
  <Container>
    <Column margin="10px">
      <ul>
        {spot.categories.map((category) => (
          <Category
            key={category.name}
            category={category}
            background="#60a5fa"
          />
        ))}
      </ul>
      <Description>
        {spot.description
          ? spot.description
          : "No automated description could be found... If you are familiar with the spot, please suggest an edit."}
      </Description>
    </Column>
    <Column margin="0">
      <Equipment equipment={spot.equipment || []} />
    </Column>
  </Container>
);

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const Column = styled.div`
  margin: ${({ margin }) => margin};
`;

const Description = styled.p`
  line-height: 1.5;
  color: #222222;
`;
