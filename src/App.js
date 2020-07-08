import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";

import "./App.less";

import Login from "./pages/login/Login";

// axios.defaults.baseURL = "https://alerta-brumadinho-api.herokuapp.com/";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact component={Login} />
        <Route path="/" exact component={Login} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
