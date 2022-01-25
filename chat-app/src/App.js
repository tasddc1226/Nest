import React, { useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";

import ChatPage from "./components/ChatPage/ChatPage";
import LoginPage from "./components/LoginPage/LoginPage";
import RegisterPage from "./components/RegisterPage/RegisterPage";

import firebase from "./firebase";

function App(props) {
  let history = useHistory();
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      console.log("user", user);
      // login 성공
      if (user) {
        history.push("/");
      } else {
        history.push("/login");
      }
    });
  }, []);

  return (
    <Switch>
      <Route exact path="/" component={ChatPage} />
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/register" component={RegisterPage} />
    </Switch>
  );
}

export default App;
