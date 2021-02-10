import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { getSpots } from "services/spots";
import { Search } from "components/Search";
import { SpotCard } from "pages/Explore/Spots/SpotCard";
import { Globe, rotateGlobe } from "./Globe";

const Home = () => {
  const [spots, setSpots] = useState(null);

  useEffect(() => {
    getSpots("type=new", setSpots);
  }, []);

  const [slide, setSlide] = useState(0);
  const [globe, setGlobe] = useState(null);

  const nextSlide = () => {
    if (slide === spots.length - 1) {
      setSlide(0);
    } else {
      setSlide(slide + 1);
    }
  };

  const prevSlide = () => {
    if (slide === 0) {
      setSlide(spots.length - 1);
    } else {
      setSlide(slide - 1);
    }
  };

  useEffect(() => {
    if (!spots || !globe) return;
    const { lat, lng } = spots[slide];
    rotateGlobe(globe, lat, lng, 0.25, 0);
  }, [slide, spots, globe]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlide((slide) => (slide === 6 ? 0 : slide + 1));
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Wrapper>
      <Container>
        {spots ? (
          <>
            <Intro>
              <Header>Welcome to SnapSpots!</Header>
              <Message>
                Our goal is simple - build the largest collection of crowd
                sourced photography spots, so you can explore the outdoors with
                confidence. Anytime. Anywhere.
              </Message>
              <Search />
            </Intro>
            <Content>
              <Globe spots={spots} setGlobe={setGlobe} />
              <CardContainer>
                <Button onClick={prevSlide}>prev</Button>
                <CardStack>
                  <SpotCard spot={spots[slide]} />
                </CardStack>
                <Button onClick={nextSlide}>next</Button>
              </CardContainer>
            </Content>
          </>
        ) : null}
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to right, #000428, #004e92);
`;

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const Content = styled.div`
  position: relative;
  width: 800px;
  height: 800px;
`;

const CardContainer = styled.div`
  position: absolute;
  right: 0;
  left: 50%;
  top: 80%;
  transform: translate(-50%, -80%);
  display: flex;
  align-items: center;
  width: 500px;
`;

const CardStack = styled.div`
  width: 100%;
`;

const Button = styled.button`
  border: none;
  border-radius: 8px;
  padding: 8px 12px;
  background: #f59e0b;
  outline: none;
  color: #ffffff;
  &:hover {
    cursor: pointer;
  }
`;

const Intro = styled.div`
  width: 500px;
  margin-bottom: 100px;
`;

const Header = styled.div`
  font-size: 60px;
  font-weight: 900;
  color: #ffffff;
`;

const Message = styled.h3`
  margin: 15px 0 30px 0;
  font-size: 24px;
  line-height: 1.4;
  color: #ffffff;
  opacity: 0.8;
`;

export default Home;
