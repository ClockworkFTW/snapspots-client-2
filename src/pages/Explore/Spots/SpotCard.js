import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import { createSpot } from "pages/View/spotSlice";
import { setPopup } from "../Map/popupSlice";
import { SpotPhotos } from "./SpotPhotos";
import { ReviewAverage } from "pages/View/Reviews/ReviewAverage";
import { Status } from "pages/View/Banner/Status";

export const SpotCard = ({ spot, margin }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const enter = () => dispatch(setPopup({ spot }));
  const leave = () => dispatch(setPopup({ spot: null }));
  const click = () => {
    if (spot.id) {
      history.push(`/spot/${spot.id}`);
    } else {
      dispatch(createSpot({ spot, history }));
    }
  };
  return (
    <Container
      onMouseEnter={enter}
      onMouseLeave={leave}
      onClick={click}
      margin={margin}
    >
      <div style={{ position: "relative" }}>
        <SpotPhotos spot={spot} />
        <div
          style={{
            zIndex: "10",
            position: "absolute",
            bottom: "10px",
            left: "10px",
          }}
        >
          {spot.categories.map((category, i) => (
            <CategoryIcon key={i} alt={category.name} src={category.icon} />
          ))}
        </div>
      </div>
      <Content>
        <Name>{spot.name}</Name>
        <Location>
          {spot.city && `${spot.city},`} {spot.country}
        </Location>
        <div style={{ fontSize: "14px" }}>
          <ReviewAverage reviews={spot.reviews ? spot.reviews : []} />
          <Status user={spot.user} />
        </div>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  margin: ${({ margin }) => (margin ? margin : "14px")};
  border-radius: 8px;
  /* border: 1px solid #e6e6e6; */
  background: #ffffff;
  overflow: hidden;
  &:hover {
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 6px 16px;
  }
`;

const Content = styled.div`
  position: relative;
  padding: 20px;
`;

const Name = styled.h1`
  font-weight: 700;
  font-size: 18px;
`;

const Location = styled.h3`
  margin: 6px 0 8px 0;
  font-size: 14px;
`;

const CategoryIcon = styled.img`
  width: 32px;
  height: 32px;
  margin-right: 4px;
  border: 2px solid #ffffff;
  border-radius: 50%;
  background: #60a5fa;
`;
