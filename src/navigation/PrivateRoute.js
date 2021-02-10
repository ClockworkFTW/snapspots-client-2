import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

import { SIGN_IN } from "./CONSTANTS";

export const PrivateRoute = ({ path, children }) => {
  const user = useSelector((state) => state.user.data);
  return (
    <Route path={path}>{user ? children : <Redirect to={SIGN_IN} />}</Route>
  );
};
