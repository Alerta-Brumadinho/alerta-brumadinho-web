import React, { useEffect } from "react";

import "./Home.css";

const Home = (props) => {
  useEffect(() => {
    console.log(props);
  }, [props]);

  return <div>home</div>;
};

export default Home;
