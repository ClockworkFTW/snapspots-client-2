import React from "react";
import styled from "styled-components";

export const Category = ({ category, background, onClick }) => (
  <Container>
    <Button
      onClick={(e) => (onClick ? onClick(e, category) : null)}
      cursor={onClick ? "pointer" : "inherit"}
      background={background}
    >
      <Icon alt={category.name} src={category.icon} />
      {category.name}
    </Button>
  </Container>
);

const Container = styled.li`
  display: inline-block;
  margin: 0 12px 12px 0;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  padding: 2px 8px 2px 4px;
  border-radius: 8px;
  border: none;
  outline: none;
  background: ${({ background }) => background};
  color: #ffffff;
  font-size: 14px;
  font-weight: 700;
  &:hover {
    cursor: ${({ cursor }) => cursor};
    background: #60a5fa;
  }
`;

const Icon = styled.img`
  margin-right: 4px;
  width: 24px;
  height: 24px;
`;
