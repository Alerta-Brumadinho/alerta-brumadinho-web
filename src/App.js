import React from "react";
import axios from "axios";
import { Switch, Route, useLocation } from "react-router-dom";
// import { useTransition, animated } from "react-spring";

import "./App.less";

import Login from "./pages/login/Login";
import RegisterProfile from "./pages/register/profile/RegisterProfile";
import RegisterUser from "./pages/register/user/RegisterUser";
import RegisterInstitution from "./pages/register/institution/RegisterInstitution";

axios.defaults.baseURL = "https://alerta-brumadinho-api.herokuapp.com";
// axios.defaults.baseURL = "http://localhost:3000";

function App() {
  const location = useLocation();
  // const transitions = useTransition(location, (location) => location.pathname, {
  //   from: { opacity: 0, transform: "translate3d(100%,0,0)" },
  //   enter: { opacity: 1, transform: "translate3d(0,0,0)" },
  //   leave: { opacity: 0, transform: "translate3d(-50%,0,0)" },
  //   trail: 0,
  // });

  return (
    // <animated.div key={key} style={props}>
    <Switch location={location}>
      <Route path="/" exact component={Login} />
      <Route path="/login" exact component={Login} />
      <Route path="/register/profile" exact component={RegisterProfile} />
      <Route path="/register/user" exact component={RegisterUser} />
      <Route
        path="/register/institution"
        exact
        component={RegisterInstitution}
      />
    </Switch>
    // </animated.div>
  );
}

export default App;
