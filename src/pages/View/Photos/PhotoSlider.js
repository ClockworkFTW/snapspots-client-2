import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import styled from "styled-components";

import "swiper/swiper-bundle.css";

export const PhotoSlider = ({ name, photos, toggle }) => {
  const containerRef = useRef();

  const [height, setHeight] = useState(null);

  useEffect(() => {
    setHeight(containerRef.current.clientHeight);
  }, []);

  return (
    <Wrapper>
      <Container ref={containerRef}>
        <Swiper>
          {photos.map((photo, i) => (
            <SwiperSlide>
              <Photo alt={`${name} photo ${i}`} src={photo} height={height} />
            </SwiperSlide>
          ))}
        </Swiper>
        <Button onClick={toggle}>close</Button>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  z-index: 100;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ffffff;
`;

const Container = styled.div`
  width: calc(100% - 300px);
  height: 70vh;
`;

const Photo = styled.img`
  width: auto;
  height: 100%;
  object-fit: cover;
`;

const Button = styled.button`
  position: absolute;
  bottom: 40px;
  right: 40px;
`;
