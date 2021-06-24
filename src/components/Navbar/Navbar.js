import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { Menu, Button } from "antd";
import {
  UserOutlined,
  FileSearchOutlined,
  ContainerOutlined,
  CompassOutlined,
  HomeOutlined,
} from "@ant-design/icons";

import {
  getLocation,
  getUserFromDb,
  deleteLocation,
  deleteToken,
  isAnExternalUser,
} from "../../services/user";

import "./Navbar.css";

const logo = require("../../assets/images/logo_512.png");

const Navbar = () => {
  const [userLocation, setUserLocation] = useState(null);
  // const [user, setUser] = useState(null);
  const [nav, setNav] = useState(null);

  const changeLocation = () => {
    deleteLocation();
    deleteToken();
    setNav("/");
  };

  useEffect(() => {
    if (isAnExternalUser()) setUserLocation(getLocation());
    else {
      getUserFromDb().then((result) => {
        setUserLocation({ uf: result.uf, city: result.city });
      });
    }
  }, []);

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

          <Menu.Item key="2" icon={<FileSearchOutlined />}>
            Minhas Denúncias
          </Menu.Item>

          <Menu.Item key="3" icon={<CompassOutlined />}>
            Mapa de Denúncias
          </Menu.Item>
          <Menu.Item key="4" icon={<UserOutlined />}>
            Meu Perfil
          </Menu.Item>
        </Menu>
      </div>

      <div className="navbar-location">
        <div>
          <HomeOutlined style={{ marginRight: "8px" }} />
          <span>Você está em:</span>
        </div>

        <h3>
          {userLocation ? userLocation.city : null} -{" "}
          {userLocation ? userLocation.uf : null}
        </h3>
        <Button type="secondary" htmlType="submit" onClick={changeLocation}>
          Sair
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
