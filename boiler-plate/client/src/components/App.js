import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import LandingPage from "./views/LandingPage/LandingPage";
import LoginPage from "./views/LoginPage/LoginPage";
import NavBar from "./views/NavBar/NavBar";
import SignUpPage from "./views/SignUpPage/SignUpPage";
import Auth from "../hoc/auth";
import MovieDetail from "./views/MovieDetail/MovieDetail";

function App() {
  return (
    <Router>
      <NavBar />
      <div>
        <Switch>
          <Route
            exact
            path="/movie/:movieId"
            component={Auth(MovieDetail, null)}
          />

          <Route exact path="/login" component={Auth(LoginPage, false)} />

          <Route exact path="/signup" component={Auth(SignUpPage, false)} />

          <Route exact path="/" component={Auth(LandingPage, null)} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
