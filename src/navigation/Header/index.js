import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

import { ROOT, EXPLORE, CREATE, SIGN_IN } from "navigation/CONSTANTS";
import { Search } from "components/Search";
import { ProfileButton } from "navigation/Header/ProfileButton";

export const Header = () => {
  const location = useLocation();
  const isHome = location.pathname === ROOT;
  const isExplore = location.pathname === EXPLORE;

  const user = useSelector((state) => state.user.data);

  return (
    <Wrapper border={isHome ? "none" : "1px solid #e6e6e6"}>
      <Container
        width={isExplore ? "100%" : "1400px"}
        margin={isExplore ? "none" : "0 auto"}
      >
        <Logo to={ROOT} color={isHome ? "#ffffff" : "#000000"}>
          SnapSpots
        </Logo>
        {!isHome && <Search width="400px" />}
        {user ? (
          <Group>
            <Link to={CREATE}>Create Spot</Link>
            <ProfileButton user={user} />
          </Group>
        ) : (
          <Link to={SIGN_IN}>Sign In</Link>
        )}
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  z-index: 1;
  position: relative;
  border-bottom: ${({ border }) => border};
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: ${({ width }) => width};
  margin: ${({ margin }) => margin};
  padding: 10px 34px;
`;

const Logo = styled(Link)`
  font-size: 24px;
  font-weight: 900;
  color: ${({ color }) => color};
  text-decoration: none;
`;

const Group = styled.div`
  display: flex;
  align-items: center;
`;
