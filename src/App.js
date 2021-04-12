import React from "react";
import axios from "axios";
import { Switch, Route, Redirect } from "react-router-dom";

import "./App.less";

import { getToken } from "./services/auth";

import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";

import RegisterResident from "./pages/Register/RegisterResident/RegisterResident";
import RegisterPublicAgency from "./pages/Register/RegisterPublicAgency/RegisterPublicAgency";
import SelectLocation from "./pages/SelectLocation/SelectLocation";
import ForgotPassword from "./pages/Password/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/Password/ResetPassword/ResetPassword";

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;
// axios.defaults.baseURL = "http://localhost:3000";

function App() {
  return (
    <Switch>
      <Route
        path="/"
        exact
        render={() => (getToken() ? <Redirect to="/home" /> : <Login />)}
      />

      <Route
        path="/home"
        exact
        render={(props) =>
          getToken() ? <Home {...props} /> : <Redirect to="/" />
        }
      />

      <Route
        path="/register/resident"
        exact
        render={() =>
          getToken() ? <Redirect to="/home" /> : <RegisterResident />
        }
      />

      <Route
        path="/register/publicAgency"
        exact
        render={() =>
          getToken() ? <Redirect to="/home" /> : <RegisterPublicAgency />
        }
      />

      <Route
        path="/selectLocation"
        render={() =>
          getToken() ? <Redirect to="/home" /> : <SelectLocation />
        }
      />

      <Route
        path="/forgot"
        exact
        render={() =>
          getToken() ? <Redirect to="/home" /> : <ForgotPassword />
        }
      />

      <Route
        path="/reset/:token"
        render={(props) =>
          getToken() ? <Redirect to="/home" /> : <ResetPassword {...props} />
        }
      />

      <Route path="/*">
        <Redirect to="/" />
      </Route>
    </Switch>
  );
}

export default App;
