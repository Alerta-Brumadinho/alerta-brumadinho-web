import React, { useEffect } from "react";

import { getToken } from "../../services/auth";

import "./Home.css";

const Home = () => {
  useEffect(() => {
    console.log(getToken());
  }, []);

  return <div>home</div>;
};

export default Home;
