import React, { useState } from "react";
import { Row, Col, Form, Input, DatePicker } from "antd";
import {
  UserOutlined,
  CalendarOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";

import "./styles.css";

const RegisterInfo = (props) => {
  const [phone, setPhone] = useState("");

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onChange = (e) => {
    let { value } = e.target;
    const re = /^[0-9\b]+$/;

    if (!(value === "" || re.test(value))) {
      console.log(value.substring(0, value.length - 1));
      setPhone(value.substring(0, value.length - 1));
    } else {
      setPhone(value);
    }
  };

  return (
    <div>
      <Row justify="center" gutter={[0, { xs: 32, sm: 40, md: 48, lg: 80 }]}>
        <Col span={24}></Col>
      </Row>

      <Row justify="center" gutter={[0, { xs: 16, sm: 16, md: 32, lg: 32 }]}>
        <Col xs={20} sm={16} md={12} lg={8} className="vertical-center">
          <div className="section-title">Preencha suas informações</div>
        </Col>
      </Row>

      <Row justify="center" gutter={[0, { xs: 16, sm: 16, md: 32, lg: 32 }]}>
        <Col xs={20} sm={16} md={12} lg={8} className="vertical-center">
          <Form
            name="basic"
            layout="vertical"
            style={{ width: "100%" }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Nome Completo:"
              name="name"
              hasFeedback
              rules={[
                {
                  whitespace: true,
                  message: "Por favor, insira um telefone válido!",
                },
                {
                  required: true,
                  message: "Por favor, insira seu nome completo!",
                },
              ]}
            >
              <Input
                size="large"
                placeholder="João da Silva"
                prefix={<UserOutlined />}
              />
            </Form.Item>

            <Form.Item
              label="E-mail:"
              name="email"
              hasFeedback
              rules={[
                {
                  whitespace: true,
                  message: "Por favor, insira um telefone válido!",
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
                value={phone}
                size="large"
                placeholder="joaodasilva@email.com"
                prefix={<MailOutlined />}
              />
            </Form.Item>

            <Form.Item
              label="Telefone:"
              name="phone"
              hasFeedback
              validateFirst
              rules={[
                {
                  whitespace: true,
                  message: "Por favor, insira um telefone válido!",
                },
                {
                  required: true,
                  message: "Por favor, insira seu telefone!",
                },
                {
                  type: "number",
                  message: "Por favor, insira um telefone válido!",
                  transform: (value) => {
                    return Number(value);
                  },
                },
                {
                  len: 11,
                  message: "Por favor, insira um telefone válido!",
                },
              ]}
            >
              <Input
                size="large"
                onChange={onChange}
                maxLength={11}
                placeholder="31998765432"
                prefix={<PhoneOutlined />}
              />
            </Form.Item>

            <Form.Item
              label="Data de Nascimento:"
              name="bornDate"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Por favor, insira sua data de nascimento!",
                },
              ]}
            >
              <DatePicker
                style={{ width: "100%" }}
                showToday={false}
                allowClear={false}
                placeholder="01/01/2000"
                size="large"
                format="DD/MM/YYYY"
                suffixIcon={
                  <CalendarOutlined style={{ color: "rgba(0, 0, 0, 0.65)" }} />
                }
              />
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default RegisterInfo;
