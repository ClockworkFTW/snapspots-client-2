import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";

import { SIGN_UP } from "navigation/CONSTANTS";

import { signIn } from "./userSlice";

export const SignIn = () => {
  const dispatch = useDispatch();
  const { data, error } = useSelector((state) => state.user);
  const history = useHistory();

  useEffect(() => {
    if (data) history.goBack();
  }, [data, history]);

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const onChange = (prop, val) =>
    setCredentials({ ...credentials, [prop]: val });

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(signIn({ credentials }));
  };

  const disableSubmit =
    !credentials.username.length || !credentials.password.length;

  return (
    <Wrapper>
      <Container>
        <Header>Sign in to SnapSpots</Header>
        <Redirect>
          Don't have an account? <Link to={SIGN_UP}>Sign up</Link>
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
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Password"
              value={credentials.password}
              onChange={(e) => onChange("password", e.target.value)}
            />
          </Group>
          <Button type="submit" disabled={disableSubmit}>
            Sign In
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
