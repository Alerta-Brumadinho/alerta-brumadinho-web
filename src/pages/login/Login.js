import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Input, Button, Card, Typography, Divider, Form } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import "./styles.css";

const logo = require("../../assets/images/logo_512.png");
const { Text } = Typography;

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
      <div className="card-container">
        <Card className="card-box" bordered={false}>
          <Row justify="center" style={{ paddingBottom: "20px" }}>
            <img src={logo} className="logo" alt="Alerta Brumadinho" />
          </Row>
          <Divider plain>
            <Text type="secondary" style={{ fontSize: "16px" }}>
              Bem-vindo ao Alerta Brumadinho!
            </Text>
          </Divider>
          <Form
            name="info"
            layout="vertical"
            style={{ width: "100%" }}
            hideRequiredMark
            initialValues={{ remember: true }}
            onFinish={this.login}
          >
            <Form.Item
              name="email"
              validateFirst
              rules={[
                {
                  whitespace: true,
                  message: "Por favor, insira um e-mail ou telefone válido!",
                },
                {
                  required: true,
                  message: "Por favor, insira seu e-mail ou telefone!",
                },
              ]}
            >
              <Input
                size="large"
                placeholder="E-mail ou Telefone"
                maxLength={40}
                prefix={<UserOutlined style={{ color: "#338221" }} />}
              />
            </Form.Item>

            <Form.Item
              name="password"
              validateFirst
              rules={[
                {
                  whitespace: true,
                  message: "Sua senha não deve conter espaços!",
                },
                {
                  required: true,
                  message: "Por favor, insira sua senha!",
                },
              ]}
            >
              <Input.Password
                size="large"
                placeholder="Senha"
                prefix={<LockOutlined style={{ color: "#338221" }} />}
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                className="primary-button"
                onClick={this.login}
                block
              >
                Entrar
              </Button>
            </Form.Item>
          </Form>

          <Divider plain>
            <Text type="secondary" style={{ fontSize: "16px" }}>
              Ainda não tem conta?
            </Text>
          </Divider>

          <Row justify="center">
            <Button
              size="large"
              className="secondary-button"
              onClick={this.register}
              block
            >
              <Link to="/register/profile">Cadastre-se</Link>
            </Button>
          </Row>

          <Divider />

          <Row justify="center" style={{ marginTop: 30 }}>
            <Col span={12} style={{ textAlign: "center" }}>
              <a href="www.google.com" style={{ textDecoration: "underline" }}>
                Esqueceu sua Senha?
              </a>
            </Col>
            <Col span={12} style={{ textAlign: "center" }}>
              <a href="www.google.com" style={{ textDecoration: "underline" }}>
                Acessar sem Conta
              </a>
            </Col>
          </Row>
        </Card>
        {/* <Row justify="center" gutter={[0, { xs: 24, sm: 24, md: 32, lg: 32 }]}>
          <Col span={24}></Col>
        </Row>
        <Row justify="center" gutter={[0, { xs: 24, sm: 24, md: 32, lg: 32 }]}>
          <Col span={24} className="vertical-center">
            <img src={logo} className="logo" alt="Alerta Brumadinho" />
          </Col>
        </Row>

        <Row justify="center" gutter={[0, { xs: 8, sm: 8, md: 12, lg: 12 }]}>
          <Col xs={20} sm={16} md={12} lg={8} className="vertical-center">
            <Input
              size="large"
              placeholder="E-mail ou Telefone"
              prefix={<UserOutlined style={{ color: "#338221" }} />}
            />
          </Col>
        </Row>

        <Row justify="center" gutter={[0, { xs: 24, sm: 28, md: 32, lg: 36 }]}>
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

        <Row justify="center" gutter={[0, 24]}>
          <Col xs={20} sm={16} md={12} lg={8} className="vertical-center">
            <Button
              size="large"
              className="secondary-button"
              onClick={this.register}
              block
            >
              <Link to="/register/profile">Cadastrar</Link>
            </Button>
          </Col>
        </Row> */}
      </div>
    );
  }
}

export default Login;
