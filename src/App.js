import React from "react";
import axios from "axios";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";

import "./App.less";

import Home from "./pages/Home/Home";

import RegisterUser from "./pages/Register/RegisterUser/RegisterUser";
import RegisterInstitution from "./pages/Register/RegisterInstitution/RegisterInstitution";
import ForgotPassword from "./pages/Password/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/Password/ResetPassword/ResetPassword";

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;
// axios.defaults.baseURL = "http://localhost:3000";

function App() {
  const location = useLocation();
  return (
    <Switch location={location}>
      <Route path="/" exact component={Home} />
      <Route path="/register/user" exact component={RegisterUser} />
      <Route
        path="/register/institution"
        exact
        component={RegisterInstitution}
      />

      <Route path="/forgot" exact component={ForgotPassword} />
      <Route
        path="/reset/:token"
        render={(props) => <ResetPassword {...props} />}
      />

      <Route path="/*" exact component={Home}>
        <Redirect to="/" />
      </Route>
    </Switch>
  );
}

export default App;
