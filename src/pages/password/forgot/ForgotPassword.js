import React, { useState } from "react";
import { Row, Col, Button, Card, Typography, Divider, Input, Form } from "antd";
import { Redirect } from "react-router-dom";
import {
  MailOutlined,
  LeftOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";

import "./styles.css";

const { Title, Text } = Typography;
const logo = require("../../../assets/images/logo_512.png");

const ForgotPassword = () => {
  const [nav, setNav] = useState(null);

  const sendResetPasswordEmail = () => {
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
                Trocar Senha
              </Title>
            </Col>
          </Row>

          <Divider plain>
            <Text type="secondary" style={{ fontSize: "16px" }}>
              Insira seu e-mail abaixo
            </Text>
          </Divider>

          <Form
            name="resetPassword"
            layout="vertical"
            style={{ width: "100%" }}
            hideRequiredMark
            initialValues={{ remember: true }}
            onFinish={sendResetPasswordEmail}
          >
            <Form.Item
              name="email"
              validateFirst
              style={{ marginTop: "36px" }}
              rules={[
                {
                  whitespace: true,
                  message: "Por favor, insira um e-mail válido!",
                },
                {
                  type: "email",
                  message: "Por favor, insira um e-mail válido!",
                },
                {
                  required: true,
                  message: "Por favor, insira seu e-mail!",
                },
              ]}
            >
              <Input
                size="large"
                placeholder="seuemail@email.com"
                maxLength={40}
                prefix={<MailOutlined />}
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
                Trocar Senha
              </Button>
            </Form.Item>
          </Form>

          <Divider plain>
            <InfoCircleOutlined style={{ color: "#338221" }} />
          </Divider>

          <Row justify="center">
            <Col
              xs={20}
              sm={18}
              md={18}
              lg={16}
              style={{ textAlign: "center" }}
            >
              <Text type="secondary" style={{ color: "#338221" }}>
                &nbsp;Você receberá um e-mail com um link para redefinir a sua
                senha.
              </Text>
            </Col>
          </Row>
        </Card>
      </div>
    );
  }
};

export default ForgotPassword;
