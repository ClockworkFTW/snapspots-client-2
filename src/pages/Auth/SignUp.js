import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";

import { SIGN_IN } from "navigation/CONSTANTS";

import { signUp } from "./userSlice";

export const SignUp = () => {
  const dispatch = useDispatch();
  const { data, error } = useSelector((state) => state.user);
  const history = useHistory();

  useEffect(() => {
    if (data) history.goBack();
  }, [data, history]);

  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    passwordOne: "",
    passwordTwo: "",
  });

  const onChange = (prop, val) =>
    setCredentials({ ...credentials, [prop]: val });

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(signUp({ credentials }));
  };

  const disableSubmit =
    !credentials.username.length ||
    !credentials.email.length ||
    !credentials.passwordOne.length ||
    !credentials.passwordTwo.length;

  return (
    <Wrapper>
      <Container>
        <Header>Sign up to SnapSpots</Header>
        <Redirect>
          Already have an account? <Link to={SIGN_IN}>Sign in</Link>
        </Redirect>
        {error && <Error>Error: {error}</Error>}
        <form onSubmit={onSubmit}>
          <Group>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="Username"
              value={credentials.username}
              onChange={(e) => onChange("username", e.target.value)}
            />
          </Group>
          <Group>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@mail.com"
              value={credentials.email}
              onChange={(e) => onChange("email", e.target.value)}
            />
          </Group>
          <Group>
            <Label htmlFor="passwordOne">Password</Label>
            <Input
              id="passwordOne"
              type="password"
              placeholder="6+ Characters"
              value={credentials.passwordOne}
              onChange={(e) => onChange("passwordOne", e.target.value)}
            />
          </Group>
          <Group>
            <Label htmlFor="passwordTwo">Confirm Password</Label>
            <Input
              id="passwordTwo"
              type="password"
              placeholder="6+ Characters"
              value={credentials.passwordTwo}
              onChange={(e) => onChange("passwordTwo", e.target.value)}
            />
          </Group>
          <Button type="submit" disabled={disableSubmit}>
            Sign Up
          </Button>
        </form>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f7f7f7;
`;

const Container = styled.div`
  padding: 40px;
  background: #ffffff;
  border: 1px solid #e6e6e6;
  border-radius: 16px;
`;

const Header = styled.h1`
  font-size: 22px;
  font-weight: 700;
`;

const Redirect = styled.p`
  margin: 10px 0 20px 0;
`;

const Error = styled.p`
  margin: 20px 0;
  color: red;
`;

const Group = styled.div`
  margin: 20px 0;
`;

const Label = styled.label`
  display: block;
`;

const Input = styled.input`
  display: block;
  width: 100%;
`;

const Button = styled.button`
  display: block;
  width: 100%;
`;
