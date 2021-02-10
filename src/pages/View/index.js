import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { getSpot } from "pages/View/spotSlice";

import { Banner } from "pages/View/Banner";
import { Photos } from "pages/View/Photos";
import { Details } from "pages/View/Details";
import { Weather } from "pages/View/Weather";
import { Reviews } from "pages/View/Reviews";
import { Map } from "pages/View/Map";
import { Nearby } from "pages/View/Nearby";

const View = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const spot = useSelector((state) => state.spot.data);

  useEffect(() => {
    if (!spot || spot.id !== Number(id)) dispatch(getSpot({ id }));
  }, [dispatch, spot, id]);

  return (
    spot && (
      <Container>
        <Section margin="0 10px 20px 10px">
          <Banner spot={spot} />
        </Section>
        <Section>
          <Photos name={spot.name} photos={spot.photos} />
        </Section>
        <Section margin="10px 0 0 0">
          <Details spot={spot} />
        </Section>
        <Section margin="30px 10px 0 10px">
          <Weather lat={spot.lat} lng={spot.lng} />
        </Section>
        <Section margin="60px 10px 0 10px">
          <Map width="100%" height="400px" lat={spot.lat} lng={spot.lng} />
        </Section>
        <Section margin="60px 10px 0 10px">
          <Reviews spotId={spot.id} reviews={spot.reviews} />
        </Section>
        <Section margin="60px 0 0 0">
          <Nearby lat={spot.lat} lng={spot.lng} />
        </Section>
      </Container>
    )
  );
};

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 34px;
`;

const Section = styled.div`
  margin: ${({ margin }) => (margin ? margin : 0)};
`;

export default View;
