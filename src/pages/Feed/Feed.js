import React from "react";

import Navbar from "../../components/Navbar/Navbar";

import "./Feed.css";

const Feed = (props) => {
  return (
    <div className="main-layout">
      <Navbar />
      <div className="main-layout-content">
        feed aqui!
      </div>
    </div>
  );
};

export default Feed;
