import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Menu, Button } from "antd";
import {
  UserOutlined,
  FileSearchOutlined,
  ContainerOutlined,
  CompassOutlined,
  HomeOutlined,
} from "@ant-design/icons";

import { getLocation, deleteLocation, deleteToken } from "../../services/auth";

import "./Navbar.css";

const logo = require("../../assets/images/logo_512.png");

const Navbar = () => {
  const [location, setLocation] = useState(null);
  const [nav, setNav] = useState(null);

  useEffect(() => {
    setLocation(getLocation());
  }, []);

  const changeLocation = () => {
    deleteLocation();
    deleteToken();
    setNav("/");
  };

  if (nav) return <Redirect to={nav} />;
  return (
    <div className="navbar">
      <div className="navbar-header">
        <img src={logo} alt="Alerta Brumadinho" />
        <h3>Alerta Brumadinho</h3>
      </div>

      <div className="navbar-menu">
        <Menu
          defaultSelectedKeys={["1"]}
          mode="inline"
          theme="light"
          inlineCollapsed={false}
        >
          <Menu.Item key="1" icon={<ContainerOutlined />}>
            Feed de Denúncias
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
          {location ? location.city : null} - {location ? location.uf : null}
        </h3>
        <Button type="secondary" htmlType="submit" onClick={changeLocation}>
          Sair
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
