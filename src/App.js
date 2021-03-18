import React from "react";
import axios from "axios";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
// import { useTransition, animated } from "react-spring";

import "./App.less";

import Home from "./pages/Home/Home";

import RegisterProfile from "./pages/register/profile/RegisterProfile";
import RegisterUser from "./pages/register/user/RegisterUser";
import RegisterInstitution from "./pages/register/institution/RegisterInstitution";
import ForgotPassword from "./pages/password/forgot/ForgotPassword";
import ResetPassword from "./pages/password/reset/ResetPassword";
import WarningPage from "./components/warning/WarningPage";

axios.defaults.baseURL = "https://alerta-brumadinho-api.herokuapp.com";
// axios.defaults.baseURL = "http://localhost:3000";

function App() {
  const location = useLocation();
  return (
    <Switch location={location}>
      <Route path="/" exact component={Home} />
      <Route path="/register" exact component={RegisterProfile} />
      <Route path="/register/user" exact component={RegisterUser} />
      <Route
        path="/register/institution"
        exact
        component={RegisterInstitution}
      />

      <Route path="/forgot" exact component={ForgotPassword} />
      <Route path="/reset" exact component={ResetPassword} />

      <Route path="/register/warning" exact component={WarningPage} />

      <Route path="/register/*" exact component={RegisterProfile}>
        <Redirect to="/register" />
      </Route>

      <Route path="/*" exact component={Home}>
        <Redirect to="/" />
      </Route>
    </Switch>
  );
}

export default App;
