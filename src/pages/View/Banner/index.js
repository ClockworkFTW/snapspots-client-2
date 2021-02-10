import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

// prettier-ignore
import { faArrowAltLeft, faShare, faPen, faHeart } from "@fortawesome/pro-light-svg-icons";

import { EXPLORE, SIGN_IN } from "navigation/CONSTANTS";
import { getSpots } from "pages/Explore/Spots/spotsSlice";
import { updateViewport } from "pages/Explore/Map/viewportSlice";
import { ButtonClear } from "components/Button";
import { ReviewAverage } from "pages/View/Reviews/ReviewAverage";
import { Status } from "pages/View/Banner/Status";

export const Banner = ({ spot }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.user.data);
  const coordinates = useSelector((state) => state.viewport);

  // Fetch updated spots and go to previous route
  const goBack = () => {
    if (coordinates) {
      const query = `lat=${coordinates.latitude}&lng=${coordinates.longitude}`;
      dispatch(getSpots({ query }));
    }
    history.push(EXPLORE);
  };

  // Fetch spots near current spot location and go to explore page
  const goExplore = () => {
    const query = `lat=${spot.lat}&lng=${spot.lng}`;
    dispatch(getSpots({ query }));
    const viewport = { latitude: spot.lat, longitude: spot.lng, zoom: 15 };
    dispatch(updateViewport({ viewport }));
    history.push(EXPLORE);
  };

  const onSave = () => {
    console.log("saving spot", spot.id);
  };

  const onShare = () => {
    console.log("sharing spot", spot.id);
  };

  return (
    <Container>
      <div>
        <Name>{spot.name}</Name>
        <Metadata>
          <ReviewAverage reviews={spot.reviews} />
          <Dot>&middot;</Dot>
          <Status userId={spot.userId} />
          <Dot>&middot;</Dot>
          <ButtonClear onClick={goExplore} color="#717171">
            {spot.city}, {spot.state}, {spot.country}
          </ButtonClear>
        </Metadata>
      </div>
      <div>
        <ButtonClear
          onClick={goBack}
          icon={faArrowAltLeft}
          color="#222222"
          margin="0 0 0 16px"
        >
          Back
        </ButtonClear>
        <ButtonClear
          to={user ? null : SIGN_IN}
          onClick={user ? onSave : null}
          icon={faHeart}
          color="#222222"
          margin="0 0 0 16px"
        >
          Save
        </ButtonClear>
        <ButtonClear
          onClick={onShare}
          icon={faShare}
          color="#222222"
          margin="0 0 0 16px"
        >
          Share
        </ButtonClear>
        <ButtonClear
          to={user ? `/spot/edit/${spot.id}` : SIGN_IN}
          icon={faPen}
          color="#222222"
          margin="0 0 0 16px"
        >
          Edit
        </ButtonClear>
      </div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const Name = styled.h1`
  margin-bottom: 10px;
  font-size: 24px;
  font-weight: 700;
  color: #222222;
`;

const Metadata = styled.div`
  color: #717171;
`;

const Dot = styled.span`
  margin: 0 6px;
`;
