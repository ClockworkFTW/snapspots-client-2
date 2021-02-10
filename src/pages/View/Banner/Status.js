import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShieldCheck, faUser } from "@fortawesome/pro-solid-svg-icons";
import styled from "styled-components";

export const Status = ({ userId }) => (
  <span>
    <FontAwesomeIcon icon={userId ? faUser : faShieldCheck} color="#60A5FA" />
    <Text>{userId ? "Custom" : "Curated"}</Text>
  </span>
);

const Text = styled.span`
  margin-left: 6px;
`;
