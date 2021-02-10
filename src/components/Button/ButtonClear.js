import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

export const ButtonClear = (props) => {
  const { to, onClick, icon, children, size, color, margin } = props;
  return to ? (
    <ButtonLink to={to} size={size} color={color} margin={margin}>
      {icon && <FontAwesomeIcon icon={icon} />}
      {children && <Text marginLeft={icon ? "6px" : 0}>{children}</Text>}
    </ButtonLink>
  ) : (
    <ButtonDefault onClick={onClick} size={size} color={color} margin={margin}>
      {icon && <FontAwesomeIcon icon={icon} />}
      {children && <Text marginLeft={icon ? "6px" : 0}>{children}</Text>}
    </ButtonDefault>
  );
};

const ButtonLink = styled(Link)`
  margin: ${({ margin }) => margin};
  padding: 0;
  border: none;
  background: none;
  outline: none;
  font-family: inherit;
  font-size: inherit;
  font-weight: 700;
  text-decoration: underline;
  color: ${({ color }) => color};
  &:hover {
    cursor: pointer;
  }
`;

const ButtonDefault = styled.button`
  margin: ${({ margin }) => margin};
  padding: 0;
  border: none;
  background: none;
  outline: none;
  font-family: inherit;
  font-size: inherit;
  font-weight: 700;
  text-decoration: underline;
  color: ${({ color }) => color};
  &:hover {
    cursor: pointer;
  }
`;

const Text = styled.span`
  margin-left: ${({ marginLeft }) => marginLeft};
`;
