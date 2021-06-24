import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { Redirect } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";

import Navbar from "../../components/Navbar/Navbar";

import { errorNotification } from "../../services/messages";
import {
  isAnExternalUser,
  getLocation,
  getUserFromDb,
} from "../../services/user";

import "./Feed.css";

const Feed = (props) => {
  const [nav, setNav] = useState(null);
  const [denunciations, setDenunciations] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

  const createDenunciation = () => {
    setNav("/createDenunciation");
  };

  useEffect(() => {
    if (userLocation) {
      axios
        .get(`/denunciations/fromCity/${userLocation.uf}&${userLocation.city}`)
        .then((res) => {
          setDenunciations(res.data);
        })
        .catch((error) => {
          errorNotification();
        });
    }
  }, [userLocation]);

  useEffect(() => {
    if (isAnExternalUser()) setUserLocation(getLocation());
    else {
      getUserFromDb().then((result) => {
        setUserLocation({ uf: result.uf, city: result.city });
      });
    }
  }, []);

  useEffect(() => {
    console.log(denunciations);
  }, [denunciations]);

  if (nav) return <Redirect to={nav} />;
  else {
    return (
      <div className="main-layout">
        <Navbar />
        <div className="main-layout-content">
          {denunciations
            ? denunciations.map((d) => {
                return (
                  <div key={d.id}>
                    {d.title} <br /> {d.description}
                  </div>
                );
              })
            : null}

          <Button type="primary" onClick={createDenunciation}>
            <PlusOutlined /> Registrar Denúncia
          </Button>
        </div>
      </div>
    );
  }
};

export default Feed;
