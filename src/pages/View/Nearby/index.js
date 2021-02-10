import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { Swiper, SwiperSlide } from "swiper/react";

import * as spotsAPI from "services/spots";
import { SpotCard } from "pages/Explore/Spots/SpotCard";
import { ButtonAction } from "components/Button";
import { chunk } from "helpers";

export const Nearby = ({ lat, lng }) => {
  const [spots, setSpots] = useState([]);

  useEffect(() => {
    spotsAPI.getSpots(`lat=${lat}&lng=${lng}`, setSpots);
  }, [lat, lng]);

  const [swiper, setSwiper] = useState(null);
  const [slideIndex, setSlideIndex] = useState(0);

  const prevSlide = () => {
    if (!swiper || slideIndex === 0) return;
    swiper.slideTo(slideIndex - 1, 500);
    setSlideIndex(slideIndex - 1);
  };

  const nextSlide = () => {
    if (!swiper || slideIndex === chunk(spots, 4).length) return;
    swiper.slideTo(slideIndex + 1, 500);
    setSlideIndex(slideIndex + 1);
  };

  return spots.length ? (
    <div>
      <Banner>
        <Header>Nearby Spots</Header>
        <div>
          <span style={{ fontSize: "14px" }}>
            ({slideIndex + 1}/{chunk(spots, 4).length})
          </span>
          <ButtonAction onClick={prevSlide} margin="0 0 0 6px">
            prev
          </ButtonAction>
          <ButtonAction onClick={nextSlide} margin="0 0 0 6px">
            next
          </ButtonAction>
        </div>
      </Banner>
      <Swiper onSwiper={(s) => setSwiper(s)}>
        {chunk(spots, 4).map((c, i) => (
          <SwiperSlide key={i}>
            <Container>
              {c.map((spot, j) => (
                <SpotCard key={j} spot={spot} margin="10px" />
              ))}
            </Container>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  ) : null;
};

const Banner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 10px 20px 10px;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
`;

const Header = styled.h1`
  font-size: 18px;
  font-weight: 700;
`;
