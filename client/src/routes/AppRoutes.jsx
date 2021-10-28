import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { LoginRegisterScreen } from "../views/LoginRegisterScreen";
import { MainScreen } from "../views/MainScreen";
import { TripContainer } from "../views/TripContainer";

export const AppRoutes = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/login">
            <LoginRegisterScreen />
          </Route>
          <Route exact path="/register">
            <LoginRegisterScreen />
          </Route>
          <Route exact path="/">
            <MainScreen />
          </Route>
          <Route exact path="/trip/:id">
            <TripContainer />
          </Route>
          <Route exact path="/trip">
            <TripContainer />
          </Route>
        </Switch>
      </Router>
    </>
  );
};
