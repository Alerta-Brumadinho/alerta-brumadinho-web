import React, { useState } from "react";
import { Row, Col, Form, Input, Button, Upload, Select, message } from "antd";
import MaskedInput from "antd-mask-input";
import {
  UserOutlined,
  CalendarOutlined,
  MailOutlined,
  PhoneOutlined,
  LockOutlined,
  SolutionOutlined,
  LoadingOutlined,
  PlusOutlined,
} from "@ant-design/icons";

import "./styles.css";

const { Option } = Select;

const RegisterInstitution = () => {
  const [photo, setPhoto] = useState({
    photoPreviewUrl: "",
    loading: false,
    file: null,
  });

  const manageImge = ({ file, onSuccess }) => {
    setPhoto({ ...photo, loading: true });

    getImageUrl(file, (photoPreviewUrl) =>
      setPhoto({
        photoPreviewUrl,
        file: file,
        loading: false,
      })
    );
  };

  const beforeUpload = (file) => {
    if (
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/png"
    ) {
      return true;
    }

    message.error("Erro! Só é permitido extensões JPG, JPEG ou PNG.");
    return false;
  };

  function getImageUrl(img, callback) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <Row justify="center" gutter={[0, { xs: 32, sm: 40, md: 48, lg: 80 }]}>
        <Col span={24}></Col>
      </Row>

      <Row justify="center" gutter={[0, { xs: 16, sm: 16, md: 32, lg: 32 }]}>
        <Col span={24} className="vertical-center">
          <div className="section-title">Preencha suas informações</div>
        </Col>
      </Row>

      <Row justify="center" gutter={[0, { xs: 16, sm: 16, md: 32, lg: 32 }]}>
        <Col xs={20} sm={16} md={12} lg={8} className="vertical-center">
          <Form
            name="info"
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
                  message: "Por favor, insira um nome válido!",
                },
                {
                  required: true,
                  message: "Por favor, insira seu nome completo!",
                },
              ]}
            >
              <Input
                size="large"
                maxLength={60}
                placeholder="Fulano de Tal"
                prefix={<UserOutlined />}
              />
            </Form.Item>

            <Form.Item
              label="CPF:"
              name="cpf"
              hasFeedback
              validateFirst
              rules={[
                {
                  required: true,
                  message: "Por favor, insira seu CPF!",
                },
                {
                  len: 11,
                  message: "Por favor, insira um CPF válido!",
                  transform: (value) => {
                    if (!value) {
                      return value;
                    }
                    return value.replace(/[^0-9]/g, "");
                  },
                },
              ]}
            >
              <MaskedInput
                mask="111.111.111-11"
                size="large"
                maxLength={11}
                placeholder="123.456.789-00"
                prefix={<SolutionOutlined />}
              />
            </Form.Item>

            <Form.Item
              label="Data de Nascimento:"
              name="bornDate"
              hasFeedback
              validateFirst
              rules={[
                {
                  required: true,
                  message: "Por favor, insira sua data de nascimento!",
                },
                () => ({
                  validator(rule, value) {
                    if (!value) {
                      return value;
                    }
                    const [day, month, year] = value.split("/");
                    const date = new Date(year, month - 1, day);
                    if (
                      date.toString() === "Invalid Date" ||
                      date.getTime() > new Date().getTime()
                    ) {
                      return Promise.reject(
                        "Por favor, insira uma data válida!"
                      );
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <MaskedInput
                mask="11/11/1111"
                placeholder="01/01/2000"
                size="large"
                prefix={<CalendarOutlined />}
              />
            </Form.Item>

            <Form.Item
              label="E-mail:"
              name="email"
              hasFeedback
              validateFirst
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
                maxLength={40}
                placeholder="meuemail@email.com"
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
                  required: true,
                  message: "Por favor, insira seu telefone!",
                },
                {
                  len: 11,
                  message: "Por favor, insira um telefone válido!",
                  transform: (value) => {
                    if (!value) {
                      return value;
                    }
                    return value.replace(/[^0-9]/g, "");
                  },
                },
              ]}
            >
              <MaskedInput
                mask="(11) 11111-1111"
                size="large"
                placeholder="(31) 99999-9999"
                prefix={<PhoneOutlined />}
              />
            </Form.Item>

            <Form.Item
              label="Senha:"
              name="password"
              hasFeedback
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
                {
                  min: 8,
                  message: "A senha deve ter no mínimo 8 dígitos!",
                },
              ]}
            >
              <Input.Password
                size="large"
                maxLength={20}
                placeholder="********"
                prefix={<LockOutlined />}
              />
            </Form.Item>

            <Form.Item
              label="Confirmar Senha:"
              name="confirmPassword"
              dependencies={["password"]}
              hasFeedback
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
                placeholder="********"
                prefix={<LockOutlined />}
              />
            </Form.Item>

            <Form.Item
              name="picture"
              label="Adicione uma foto:"
              style={{ width: "100%" }}
            >
              <Upload
                listType="picture-card"
                customRequest={manageImge}
                beforeUpload={beforeUpload}
                showUploadList={false}
              >
                {photo.photoPreviewUrl ? (
                  <img
                    src={photo.photoPreviewUrl}
                    alt="Foto"
                    style={{ width: "100%" }}
                  />
                ) : (
                  <div>
                    {photo.loading ? <LoadingOutlined /> : <PlusOutlined />}
                    <div className="ant-upload-text">Adicionar</div>
                  </div>
                )}
              </Upload>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                size="large"
                className="primary-button"
                htmlType="submit"
                block
              >
                Cadastrar
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default RegisterInstitution;
