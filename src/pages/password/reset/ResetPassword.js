import React, { useState } from "react";
import { Row, Col, Button, Card, Typography, Divider, Input, Form } from "antd";
import { Redirect } from "react-router-dom";
import { LeftOutlined, LockOutlined } from "@ant-design/icons";

import "./styles.css";

const { Title, Text } = Typography;
const logo = require("../../../assets/images/logo_512.png");

const ResetPassword = () => {
  const [nav, setNav] = useState(null);

  const resetPassword = () => {
    console.log("reset passwd");
  };

  if (nav) return <Redirect to={nav} />;
  else {
    return (
      <div className="card-container">
        <Card className="card-box" bordered={false}>
          <Row justify="center" gutter={16} style={{ paddingBottom: "16px" }}>
            <Col span={4} style={{ alignSelf: "center" }}>
              <Button
                shape="circle"
                onClick={() => {
                  setNav("/");
                }}
              >
                <LeftOutlined />
              </Button>
            </Col>
            <Col span={6} style={{ textAlign: "right" }}>
              <img src={logo} className="logo-small" alt="Alerta Brumadinho" />
            </Col>

            <Col
              span={14}
              style={{
                borderLeft: "1px solid #f0f0f0",
                alignSelf: "center",
              }}
            >
              <Title type="secondary" level={3} style={{ margin: "0px" }}>
                Redefinir Senha
              </Title>
            </Col>
          </Row>

          <Divider plain>
            <Text type="secondary" style={{ fontSize: "16px" }}>
              Insira sua nova senha abaixo
            </Text>
          </Divider>

          <Form
            name="resetPassword"
            layout="vertical"
            style={{ width: "100%" }}
            hideRequiredMark
            initialValues={{ remember: true }}
            onFinish={resetPassword}
          >
            <Form.Item
              name="password"
              validateFirst
              style={{ marginTop: "36px" }}
              rules={[
                {
                  whitespace: true,
                  message: "Sua senha não deve conter espaços!",
                },
                {
                  required: true,
                  message: "Por favor, insira sua senha!",
                },
                {
                  min: 8,
                  message: "A senha deve ter no mínimo 8 dígitos!",
                },
              ]}
            >
              <Input.Password
                size="large"
                maxLength={20}
                placeholder="Nova Senha"
                prefix={<LockOutlined />}
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              dependencies={["password"]}
              validateFirst
              rules={[
                {
                  whitespace: true,
                  message: "Sua senha não deve conter espaços!",
                },
                {
                  required: true,
                  message: "Por favor, confirme sua senha!",
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject("As senhas não conferem!");
                  },
                }),
              ]}
            >
              <Input.Password
                size="large"
                maxLength={20}
                placeholder="Confirmar Nova Senha"
                prefix={<LockOutlined />}
              />
            </Form.Item>

            <Form.Item style={{ paddingTop: "16px" }}>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                className="primary-button"
                block
              >
                Redefinir Senha
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    );
  }
};

export default ResetPassword;
