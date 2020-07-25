import React from "react";
import axios from "axios";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
// import { useTransition, animated } from "react-spring";

import "./App.less";

import Login from "./pages/login/Login";
import RegisterProfile from "./pages/register/profile/RegisterProfile";
import RegisterUser from "./pages/register/user/RegisterUser";
import RegisterInstitution from "./pages/register/institution/RegisterInstitution";
import ForgotPassword from "./pages/password/forgot/ForgotPassword";
import ResetPassword from "./pages/password/reset/ResetPassword";

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
      <Route path="/register" exact component={RegisterProfile} />
      <Route path="/register/user" exact component={RegisterUser} />
      <Route path="/register/institution" exact component={RegisterInstitution} />

      <Route path="/forgot" exact component={ForgotPassword} />
      <Route path="/reset" exact component={ResetPassword} />

      <Route path="/register/*" exact component={RegisterProfile}>
        <Redirect to="/register" />
      </Route>

      <Route path="/*" exact component={Login}>
        <Redirect to="/" />
      </Route>
    </Switch>
    // </animated.div>
  );
}

export default App;
