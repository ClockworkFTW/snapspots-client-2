import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

export const ButtonAction = (props) => {
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
  padding: 4px 8px;
  border: none;
  border-radius: 8px;
  background: ${({ color }) => (color ? color : "#60a5fa")};
  outline: none;
  font-family: inherit;
  font-size: ${({ size }) => (size ? size : "14px")};
  font-weight: 700;
  text-transform: capitalize;
  text-decoration: none;
  color: #ffffff;
  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;

const ButtonDefault = styled.button`
  margin: ${({ margin }) => margin};
  padding: 4px 8px;
  border: none;
  border-radius: 8px;
  background: ${({ color }) => (color ? color : "#60a5fa")};
  outline: none;
  font-family: inherit;
  font-size: ${({ size }) => (size ? size : "14px")};
  font-weight: 700;
  text-transform: capitalize;
  color: #ffffff;
  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;

const Text = styled.span`
  margin-left: ${({ marginLeft }) => marginLeft};
`;
