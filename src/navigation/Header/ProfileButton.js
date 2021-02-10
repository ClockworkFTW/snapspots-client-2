import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { signOut } from "pages/Auth/userSlice";

export const ProfileButton = ({ user }) => {
  const dispatch = useDispatch();

  const [showDropdown, setShowDropdown] = useState(false);

  const onSignOut = () => {
    setShowDropdown(false);
    dispatch(signOut());
  };

  return (
    <Container>
      <Button onClick={() => setShowDropdown(!showDropdown)}>
        <Username>{user.username}</Username>
        <Avatar alt="profile-picture" src="https://i.pravatar.cc/300" />
      </Button>
      {showDropdown && (
        <Dropdown>
          <Item>My Spots</Item>
          <Item>Saved Spots</Item>
          <Item>Profile</Item>
          <Item onClick={onSignOut}>Sign Out</Item>
        </Dropdown>
      )}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  padding: 6px;
  border: 1px solid #dddddd;
  border-radius: 40px;
  background: #ffffff;
  outline: none;
  font-family: inherit;
  &:hover {
    cursor: pointer;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.18);
  }
`;

const Username = styled.span`
  margin: 0 10px;
  font-size: 14px;
`;

const Avatar = styled.img`
  width: 34px;
  height: 34px;
  border-radius: 50%;
`;

const Dropdown = styled.ul`
  position: absolute;
  top: 50px;
  right: 0;
  width: 200px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 6px 16px;
  overflow: hidden;
`;

const Item = styled.li`
  padding: 10px;
  &:hover {
    cursor: pointer;
    background: #f7f7f7;
  }
`;
