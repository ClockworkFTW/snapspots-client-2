import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/pro-solid-svg-icons";
import styled from "styled-components";

export const ReviewAverage = ({ reviews }) => {
  const sum = reviews ? reviews.reduce((acc, cur) => acc + cur.rating, 0) : 0;
  const total = reviews.length;
  const average = sum / total;
  return (
    <span>
      <FontAwesomeIcon icon={faStar} color="#FBBF24" />
      <Rating>{total ? average.toFixed(2) : "No reviews"}</Rating>
      <span>({total})</span>
    </span>
  );
};

const Rating = styled.span`
  margin: 0 6px;
  font-weight: 700;
  color: #222222;
`;
