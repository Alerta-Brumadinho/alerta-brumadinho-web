import React, { Component } from "react";
import { Row, Col, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import "./styles.css";

const logo = require("../../assets/images/logo_512.png");

class Login extends Component {
  login = () => {
    console.log("login");
  };

  register = () => {
    console.log("register");
  };

  forgotPassword = () => {
    console.log("forgotPassword");
  };

  accessWithoutLogin = () => {
    console.log("accessWithoutLogin");
  };

  render() {
    return (
      <div>
        <Row justify="center" style={{ height: "38vh" }}>
          <Col span={24} className="vertical-center">
            <img src={logo} className="logo" alt="Alerta Brumadinho" />
          </Col>
        </Row>

        <Row justify="center" style={{ height: "8vh" }}>
          <Col xs={20} sm={16} md={12} lg={8} className="vertical-center">
            <Input
              size="large"
              placeholder="E-mail ou Telefone"
              style={{ fontStyle: "italic" }}
              prefix={<UserOutlined style={{ color: "#338221" }} />}
            />
          </Col>
        </Row>

        <Row justify="center" style={{ height: "8vh" }}>
          <Col xs={20} sm={16} md={12} lg={8} className="vertical-center">
            <Input.Password
              size="large"
              placeholder="Senha"
              prefix={<LockOutlined style={{ color: "#338221" }} />}
            />
          </Col>
        </Row>

        <Row justify="center" style={{ height: "8vh" }}>
          <Col xs={10} sm={8} md={6} lg={4} className="vertical-center">
            <a href="#" style={{ textDecoration: "underline" }}>
              Esqueceu sua Senha?
            </a>
          </Col>
          <Col xs={10} sm={8} md={6} lg={4} className="vertical-center">
            <a href="#" style={{ textDecoration: "underline" }}>
              Acessar sem Cadastro
            </a>
          </Col>
        </Row>

        <Row justify="center" style={{ height: "12vh" }}>
          <Col xs={20} sm={16} md={12} lg={8} className="vertical-bottom">
            <Button
              type="primary"
              size="large"
              className="primary-button"
              onClick={this.login}
              block
            >
              Entrar
            </Button>
          </Col>
        </Row>

        <Row justify="center" style={{ height: "10vh" }}>
          <Col xs={20} sm={16} md={12} lg={8} className="vertical-center">
            <Button
              size="large"
              className="secondary-button"
              onClick={this.register}
              block
            >
              Cadastrar
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Login;
