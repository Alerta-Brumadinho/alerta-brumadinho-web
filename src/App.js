import React, { useEffect } from "react";
import axios from "axios";
import "./App.css";
import { Button } from "antd";
import 'antd/dist/antd.css';

axios.defaults.baseURL = "https://alerta-brumadinho-api.herokuapp.com/";
// axios.defaults.baseURL = '';

function App() {
  useEffect(() => {
    axios.get("post").then((res) => {
      console.log(res);
    });
  }, []);

  return (
    <div className="App">
      <Button type="primary">Primary Button</Button>
      <Button>Default Button</Button>
      <Button type="dashed">Dashed Button</Button>
      <br />
      <Button type="text">Text Button</Button>
      <Button type="link">Link Button</Button>
    </div>
  );
}

export default App;
