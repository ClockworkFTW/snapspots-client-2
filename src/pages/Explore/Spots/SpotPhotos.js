import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import styled from "styled-components";

import "swiper/swiper-bundle.css";

export const SpotPhotos = ({ spot }) => {
  const containerRef = useRef();

  const [height, setHeight] = useState(null);

  useEffect(() => {
    setHeight(containerRef.current.clientHeight);
  }, []);

  return (
    <Wrapper>
      <Container ref={containerRef}>
        {height && (
          <Swiper>
            {spot.photos.map((photo, i) => (
              <SwiperSlide key={i}>
                <Photo alt={spot.name} src={photo} height={height} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  padding-top: 60%;
  background: #d6d6d6;
`;

const Container = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const Photo = styled.img`
  width: 100%;
  height: ${({ height }) => `${height}px`};
  object-fit: cover;
`;
