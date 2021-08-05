import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

import { Button, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import axios from "axios";

import Navbar from "../../components/Navbar/Navbar";
import Denunciation from "../../components/Denunciation/Denunciation";

import { errorNotification } from "../../services/messages";
import {
  isAnExternalUser,
  getLocation,
  getUserFromDb,
} from "../../services/user";

import "./Feed.css";

const { Option } = Select;

const Feed = (props) => {
  const [nav, setNav] = useState(null);
  const [denunciations, setDenunciations] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [userId, setUserId] = useState(null);

  const [orderBy, setOrderBy] = useState("created"); // Default denunciations order: by date / recent first

  const createDenunciation = () => {
    setNav("/createDenunciation");
  };

  useEffect(() => {
    if (userLocation) {
      axios
        .get(
          `/denunciations/fromCity/${userLocation.uf}&${userLocation.city}&${orderBy}&-1`
        )
        .then((res) => {
          console.log(res.data);
          setDenunciations(res.data);
        })
        .catch((error) => {
          errorNotification();
        });
    }
  }, [userLocation, orderBy]);

  useEffect(() => {
    if (isAnExternalUser()) setUserLocation(getLocation());
    else {
      getUserFromDb().then((result) => {
        setUserLocation({ uf: result.uf, city: result.city });
        setUserId(result._id);
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
          <div className="order-by-container">
            <div>Ordenar por: </div>
            <Select
              defaultValue="created"
              bordered={false}
              style={{ fontWeight: "bold" }}
              onChange={() => {
                setOrderBy(orderBy === "created" ? "relevance" : "created");
              }}
            >
              <Option value="created">Mais recentes</Option>
              <Option value="relevance">Mais relevantes</Option>
            </Select>
          </div>

          {denunciations
            ? denunciations.map((d) => {
                return (
                  <Denunciation denunciation={d} key={d.id} userId={userId} />
                );
              })
            : null}

          <Button type="primary" size="large" onClick={createDenunciation} className="create-denunciation-button">
            <PlusOutlined /> Registrar Denúncia
          </Button>
        </div>
      </div>
    );
  }
};

export default Feed;
