import React, { useEffect } from "react";
import axios from "axios";
import logo from "./logo.svg";
import "./App.css";

axios.defaults.baseURL = 'https://alerta-brumadinho-api.herokuapp.com/';
// axios.defaults.baseURL = '';

function App() {
  useEffect(() => {
    axios
      .get("post")
      .then((res) => {
        console.log(res);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
