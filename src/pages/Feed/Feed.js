import React, { useState } from "react";
import { Button } from "antd";
import { Redirect } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";

import Navbar from "../../components/Navbar/Navbar";

import "./Feed.css";

const Feed = (props) => {
  const [nav, setNav] = useState(null);

  const createDenunciation = () => {
    setNav("/createDenunciation");
  };

  if (nav) return <Redirect to={nav} />;
  else {
    return (
      <div className="main-layout">
        <Navbar />
        <div className="main-layout-content">
          <Button type="primary" onClick={createDenunciation}>
            <PlusOutlined /> Registrar Denúncia
          </Button>

          <div>feed aqui!</div>
        </div>
      </div>
    );
  }
};

export default Feed;
