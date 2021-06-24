import React from "react";
import axios from "axios";
import { Switch, Route, Redirect } from "react-router-dom";

import "./App.less";

import Login from "./pages/Login/Login";
import Feed from "./pages/Feed/Feed";

import RegisterResident from "./pages/Register/RegisterResident/RegisterResident";
import RegisterPublicAgency from "./pages/Register/RegisterPublicAgency/RegisterPublicAgency";
import SelectLocation from "./pages/SelectLocation/SelectLocation";
import ForgotPassword from "./pages/Password/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/Password/ResetPassword/ResetPassword";
import CreateDenunciation from "./pages/CreateDenunciation/CreateDenunciation";

import { getToken } from "./services/user";

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;
// axios.defaults.baseURL = "http://localhost:3000";

function App() {
  return (
    <Switch>
      <Route
        path="/"
        exact
        render={() => (getToken() ? <Redirect to="/feed" /> : <Login />)}
      />

      <Route
        path="/feed"
        exact
        render={(props) =>
          getToken() ? <Feed {...props} /> : <Redirect to="/" />
        }
      />

      <Route
        path="/createDenunciation"
        exact
        render={(props) =>
          getToken() ? <CreateDenunciation {...props} /> : <Redirect to="/" />
        }
      />

      <Route
        path="/register/resident"
        exact
        render={() =>
          getToken() ? <Redirect to="/feed" /> : <RegisterResident />
        }
      />

      <Route
        path="/register/publicAgency"
        exact
        render={() =>
          getToken() ? <Redirect to="/feed" /> : <RegisterPublicAgency />
        }
      />

      <Route
        path="/selectLocation"
        render={() =>
          getToken() ? <Redirect to="/feed" /> : <SelectLocation />
        }
      />

      <Route
        path="/forgot"
        exact
        render={() =>
          getToken() ? <Redirect to="/feed" /> : <ForgotPassword />
        }
      />

      <Route
        path="/reset/:token"
        render={(props) =>
          getToken() ? <Redirect to="/feed" /> : <ResetPassword {...props} />
        }
      />

      <Route path="/*">
        <Redirect to="/" />
      </Route>
    </Switch>
  );
}

export default App;
