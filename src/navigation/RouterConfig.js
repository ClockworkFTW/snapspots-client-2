import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { ROOT, EXPLORE, VIEW, EDIT, SIGN_UP, SIGN_IN } from "./CONSTANTS";

import { Header } from "./Header";
import { NotFound } from "./NotFound";
import { PrivateRoute } from "./PrivateRoute";

import Home from "pages/Home";
import Explore from "pages/Explore";
import View from "pages/View";
import Edit from "pages/Edit";
import { SignUp, SignIn } from "pages/Auth";

export const RouterConfig = () => (
  <Router>
    <Header />
    <Switch>
      <Route exact path={ROOT}>
        <Home />
      </Route>
      <Route exact path={EXPLORE}>
        <Explore />
      </Route>
      <PrivateRoute path={EDIT}>
        <Edit />
      </PrivateRoute>
      <Route path={VIEW}>
        <View />
      </Route>
      <Route path={SIGN_UP}>
        <SignUp />
      </Route>
      <Route path={SIGN_IN}>
        <SignIn />
      </Route>
      <Route path="*">
        <NotFound />
      </Route>
    </Switch>
  </Router>
);
