import React from "react";
import { Row, Col, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import "./styles.css";

const logo = require("../../assets/images/logo_512.png");

const Login = () => {
  return (
    <div>
      <Row justify="center" style={{ height: "38vh" }}>
        <Col span={24} className="vertical-center">
          <img src={logo} className="logo" alt="Alerta Brumadinho" />
        </Col>
      </Row>

      <Row justify="center" style={{ height: "8vh" }}>
        <Col span={20} className="vertical-center">
          <Input size="large" placeholder="E-mail" prefix={<UserOutlined />} />
        </Col>
      </Row>

      <Row justify="center" style={{ height: "8vh" }}>
        <Col span={20} className="vertical-center">
          <Input size="large" placeholder="Senha" prefix={<LockOutlined />} />
        </Col>
      </Row>

      <Row justify="center" style={{ height: "8vh" }}>
        <Col span={10} className="vertical-center">
          <a style={{ fontSize: "14px", textDecoration: "underline" }}>
            Esqueceu sua Senha?
          </a>
        </Col>
        <Col span={10} className="vertical-center">
          <a style={{ fontSize: "14px", textDecoration: "underline" }}>
            Acessar sem Cadastro
          </a>
        </Col>
      </Row>

      <Row justify="center" style={{ height: "12vh" }}>
        <Col span={20} className="vertical-bottom">
          <Button type="primary" size="large" className="primary-button" block>
            Entrar
          </Button>
        </Col>
      </Row>

      <Row justify="center" style={{ height: "10vh" }}>
        <Col span={20} className="vertical-center">
          <Button size="large" className="secondary-button" block>
            Cadastrar
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
