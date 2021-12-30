import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import NavBar from "./components/views/NavBar/NavBar";
import SignUpPage from "./components/views/SignUpPage/SignUpPage";
import Auth from './hoc/auth';

function App() {
  return (
    <Router>
      <NavBar />
      <div>
        <Switch>
          <Route exact path="/login" component={Auth(LoginPage, false)} />

          <Route exact path="/signup" component={Auth(SignUpPage, false) } />

          <Route exact path="/" component={Auth(LandingPage, null) } />
        </Switch>
      </div>
    </Router>
    
  );
}

export default App;
