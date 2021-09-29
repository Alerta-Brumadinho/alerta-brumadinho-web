import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { Menu, Button, Badge } from "antd";
import axios from "axios";
import {
  SearchOutlined,
  ContainerOutlined,
  HomeOutlined,
  EyeOutlined,
} from "@ant-design/icons";

import {
  getLocation,
  getUserFromDb,
  getToken,
  deleteLocation,
  deleteToken,
  isAnExternalUser,
} from "../../services/user";
import { errorNotification } from "../../services/messages";

import "./Navbar.css";

const logo = require("../../assets/images/logo_512.png");

const Navbar = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [user, setUser] = useState(null);
  const [nav, setNav] = useState(null);
  const [numberOfUnverifiedDenunciations, setNumberOfUnverifiedDenunciations] =
    useState(null);

  const changeLocation = () => {
    deleteLocation();
    deleteToken();
    setNav("/");
  };

  useEffect(() => {
    if (isAnExternalUser()) setUserLocation(getLocation());
    else {
      getUserFromDb().then((result) => {
        setUser(result);
        setUserLocation({ uf: result.uf, city: result.city });
      });
    }
  }, []);

  useEffect(() => {
    if (user?.type === "auditor") {
      axios
        .get(
          `/denunciations/fromStatusAndCity/unverified&MG&Brumadinho&created&-1`,
          {
            headers: { token: getToken() },
          }
        )
        .then((res) => {
          setNumberOfUnverifiedDenunciations(res.data.length);
        })
        .catch((error) => {
          errorNotification();
        });
    }
  }, [user]);

  if (nav) return <Redirect to={nav} />;
  return (
    <div className="navbar">
      <div className="navbar-header">
        <img src={logo} alt="Alerta Brumadinho" />
        <h3>Alerta Brumadinho</h3>
      </div>

      <div className="navbar-menu">
        <Menu
          defaultSelectedKeys={["feed"]}
          mode="inline"
          theme="light"
          inlineCollapsed={false}
        >
          <Menu.Item key="feed" icon={<ContainerOutlined />}>
            <Link to="/feed">Feed de Denúncias</Link>
          </Menu.Item>

          <Menu.Item key="search" icon={<SearchOutlined />}>
            <Link to="/search">Buscar Denúncia</Link>
          </Menu.Item>

          {user?.type === "auditor" ? (
            <Menu.Item key="5" icon={<EyeOutlined />}>
              <Badge count={numberOfUnverifiedDenunciations} offset={[15, 6]}>
                <Link to="/audit">Validar Denúncias</Link>
              </Badge>
            </Menu.Item>
          ) : null}
        </Menu>
      </div>

      <div className="navbar-location">
        <div>
          <HomeOutlined style={{ marginRight: "8px" }} />
          <span>Você está em:</span>
        </div>

        <h3>
          {userLocation?.city} - {userLocation?.uf}
        </h3>
        <Button type="secondary" htmlType="submit" onClick={changeLocation}>
          Sair
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
