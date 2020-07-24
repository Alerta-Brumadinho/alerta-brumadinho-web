import React, { useState } from "react";
import axios from "axios";
import MaskedInput from "antd-mask-input";
import { Redirect } from "react-router-dom";
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Upload,
  Select,
  message,
  Card,
  Typography,
  Divider,
} from "antd";
import {
  UserOutlined,
  CalendarOutlined,
  MailOutlined,
  PhoneOutlined,
  LockOutlined,
  SolutionOutlined,
  LoadingOutlined,
  PlusOutlined,
  PushpinOutlined,
  LeftOutlined,
} from "@ant-design/icons";

import { ufs, verificationStatus } from "../../../services/basicInfo";
import {
  successNotification,
  errorNotification,
} from "../../../services/messages";
import "./styles.css";

const { Option } = Select;
const { Title, Text } = Typography;
const logo = require("../../../assets/images/logo_512.png");

const RegisterUser = (props) => {
  const [nav, setNav] = useState(null);
  const [submit, setSubmit] = useState({ disabled: false, loading: false });
  const [photo, setPhoto] = useState({
    url: "",
    loading: false,
    file: null,
  });

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

  const uploadImage = ({ file, onSuccess }) => {
    console.log(file);
    setPhoto({ ...photo, loading: true });
    setSubmit({ disabled: true });

    const formData = new FormData();
    formData.append("api_key", "131724773834346");
    formData.append("upload_preset", "jpdyw4h7");
    formData.append("file", file);
    formData.append("folder", "profile-pictures");

    axios
      .post("https://api.cloudinary.com/v1_1/brumadinho/upload", formData, {
        headers: { "X-Requested-With": "XMLHttpRequest" },
      })
      .then((res) => {
        setPhoto({ ...photo, loading: false, url: res.data.secure_url });
        setSubmit({ disabled: false });
      })
      .catch((error) => {
        errorNotification();
      });
  };

  const registerUser = (values) => {
    setSubmit({ ...submit, loading: true });

    const birth = values.birth.split("/").reverse().join("-");
    const verified =
      props.location.profileType === "common"
        ? verificationStatus.verified.type
        : verificationStatus.unverified.type;

    delete values.confirmPassword;
    const finalForm = {
      ...values,
      verified,
      birth,
      photo: photo.url,
      type: props.location.profileType,
    };

    axios
      .post("/users/create", finalForm)
      .then(function (res) {
        successNotification("Seu cadastro foi realizado com sucesso.");
        setSubmit({ ...submit, loading: false });
      })
      .catch(function (error) {
        if (error.response.status === 400) {
          errorNotification("CPF, E-mail ou Telefone já cadastrado.");
        } else {
          errorNotification();
        }

        setSubmit({ ...submit, loading: false });
      });
  };

  if (nav) return <Redirect to={nav} />;
  else {
    return (
      <div className="card-container">
        <Card className="card-box card-register" bordered={false}>
          <Row justify="center" gutter={16} style={{ paddingBottom: "16px" }}>
            <Col span={4} style={{ alignSelf: "center" }}>
              <Button
                shape="circle"
                onClick={() => {
                  setNav("/register/profile");
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
                Cadastrar
              </Title>
            </Col>
          </Row>

          <Divider plain>
            <Text type="secondary" style={{ fontSize: "16px" }}>
              Preencha suas informações
            </Text>
          </Divider>

          {/* Form */}
          <Row justify="center" style={{ marginTop: "32px" }}>
            <Form
              name="info"
              layout="vertical"
              style={{ width: "100%" }}
              initialValues={{ remember: true }}
              onFinish={registerUser}
            >
              {props.location.profileType !== "common" ? (
                <div>
                  {/* Institution */}
                  <Form.Item
                    label="Instituição:"
                    name="institution"
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: "Por favor, selecione uma instituição!",
                      },
                    ]}
                  >
                    <Select
                      showSearch
                      prefix={<UserOutlined />}
                      placeholder="Selecione sua Instituição"
                      optionFilterProp="children"
                      size="large"
                      notFoundContent={<div>Nenhum resultado</div>}
                      filterOption={true}
                    >
                      <Option value="jack">Jack</Option>
                      <Option value="lucy">Lucy</Option>
                      <Option value="tom">Tom</Option>
                    </Select>
                  </Form.Item>

                  <Row
                    justify="center"
                    gutter={[0, { xs: 16, sm: 16, md: 32, lg: 32 }]}
                  >
                    <Col
                      span={24}
                      style={{ textAlign: "right", marginTop: "-20px" }}
                    >
                      <a
                        href="/register/institution"
                        style={{ textDecoration: "underline" }}
                      >
                        Não encontrou sua Instituição? Clique aqui!
                      </a>
                    </Col>
                  </Row>
                </div>
              ) : null}

              {/* Name */}
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

              {/* CPF */}
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

              {/* Birth */}
              <Form.Item
                label="Data de Nascimento:"
                name="birth"
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

              {/* Email */}
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

              {/* Phone */}
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

              {/* UF */}
              <Form.Item
                label="Estado:"
                name="uf"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Por favor, selecione um estado!",
                  },
                ]}
              >
                <Select
                  showSearch
                  prefix={<UserOutlined />}
                  placeholder="MG - Minas Gerais"
                  optionFilterProp="children"
                  size="large"
                  notFoundContent={<div> Nenhum resultado </div>}
                  filterOption={true}
                >
                  {ufs.map((uf) => (
                    <Option key={uf.value} value={uf.value}>
                      {" "}
                      {uf.value} - {uf.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              {/* City */}
              <Form.Item
                label="Município:"
                name="city"
                hasFeedback
                rules={[
                  {
                    whitespace: true,
                    message: "Por favor, insira um município válido!",
                  },
                  {
                    required: true,
                    message: "Por favor, insira seu município!",
                  },
                ]}
              >
                <Input
                  size="large"
                  maxLength={60}
                  placeholder="Brumadinho"
                  prefix={<PushpinOutlined />}
                />
              </Form.Item>

              {/* Password */}
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

              {/* Confirm Password */}
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

              {/* Photo */}
              <Form.Item
                name="photo"
                label="Adicione uma foto:"
                style={{ width: "100%" }}
              >
                <Upload
                  listType="picture-card"
                  customRequest={uploadImage}
                  beforeUpload={beforeUpload}
                  showUploadList={false}
                >
                  {photo.url ? (
                    <img src={photo.url} alt="Foto" style={{ width: "100%" }} />
                  ) : (
                    <div>
                      {photo.loading ? <LoadingOutlined /> : <PlusOutlined />}
                      <div className="ant-upload-text">Adicionar</div>
                    </div>
                  )}
                </Upload>
              </Form.Item>

              {/* Submit Button */}
              <Form.Item>
                <Button
                  type="primary"
                  size="large"
                  className="primary-button"
                  htmlType="submit"
                  disabled={submit.disabled}
                  loading={submit.loading}
                  block
                >
                  Cadastrar
                </Button>
              </Form.Item>
            </Form>
          </Row>
        </Card>
      </div>
    );
  }
};

export default RegisterUser;
