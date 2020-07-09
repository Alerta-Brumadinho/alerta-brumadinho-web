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
        <Row justify="center" gutter={[0, { xs: 24, sm: 32, md: 40, lg: 48 }]}>
          <Col span={24}></Col>
        </Row>
        <Row justify="center" gutter={[0, { xs: 24, sm: 32, md: 40, lg: 48 }]}>
          <Col span={24} className="vertical-center">
            <img src={logo} className="logo" alt="Alerta Brumadinho" />
          </Col>
        </Row>

        <Row justify="center" gutter={[0, { xs: 8, sm: 8, md: 12, lg: 12 }]}>
          <Col xs={20} sm={16} md={12} lg={8} className="vertical-center">
            <Input
              size="large"
              placeholder="E-mail ou Telefone"
              style={{ fontStyle: "italic" }}
              prefix={<UserOutlined style={{ color: "#338221" }} />}
            />
          </Col>
        </Row>

        <Row justify="center" gutter={[0, { xs: 12, sm: 12, md: 16, lg: 16 }]}>
          <Col xs={20} sm={16} md={12} lg={8} className="vertical-center">
            <Input.Password
              size="large"
              placeholder="Senha"
              prefix={<LockOutlined style={{ color: "#338221" }} />}
            />
          </Col>
        </Row>

        <Row justify="center" gutter={[0, { xs: 48, sm: 56, md: 64, lg: 72 }]}>
          <Col xs={10} sm={8} md={6} lg={4} className="vertical-center">
            <a href="www.google.com" style={{ textDecoration: "underline" }}>
              Esqueceu sua Senha?
            </a>
          </Col>
          <Col xs={10} sm={8} md={6} lg={4} className="vertical-center">
            <a href="www.google.com" style={{ textDecoration: "underline" }}>
              Acessar sem Cadastro
            </a>
          </Col>
        </Row>

        <Row justify="center" gutter={[0, { xs: 8, sm: 8, md: 12, lg: 12 }]}>
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

        <Row justify="center" gutter={[0, { xs: 24, sm: 32, md: 40, lg: 48 }]}>
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
