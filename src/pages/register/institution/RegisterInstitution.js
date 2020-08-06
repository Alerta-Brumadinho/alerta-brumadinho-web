import React, { useState, useEffect } from "react";
import axios from "axios";
import MaskedInput from "antd-mask-input";
import { Redirect, Link } from "react-router-dom";
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
  MailOutlined,
  PhoneOutlined,
  SolutionOutlined,
  LoadingOutlined,
  PlusOutlined,
  LeftOutlined,
} from "@ant-design/icons";

import "./styles.css";

import {
  institutionType,
  verificationStatus,
  warningTexts,
} from "../../../services/basicInfo";

import {
  successNotification,
  errorNotification,
} from "../../../services/messages";

const { Option } = Select;
const { Title, Text } = Typography;
const logo = require("../../../assets/images/logo_512.png");

const RegisterInstitution = (props) => {
  const [ufs, setUfs] = useState([]);
  const [selectedUf, setSelectedUf] = useState({ key: null, value: null });
  const [cities, setCities] = useState([]);

  const [ufsLoading, setUfsLoading] = useState(false);
  const [citiesLoading, setCitiesLoading] = useState(false);

  const [nav, setNav] = useState(null);
  const [submit, setSubmit] = useState({ disabled: false, loading: false });
  const [photo, setPhoto] = useState({
    url: "",
    loading: false,
    file: null,
  });

  useEffect(() => {
    setUfsLoading(true);

    axios
      .get("https://servicodados.ibge.gov.br/api/v1/localidades/estados/")
      .then((res) => {
        setUfsLoading(false);
        setUfs(res.data.sort((a, b) => a.sigla.localeCompare(b.sigla)));
      })
      .catch((error) => {
        setUfsLoading(false);
        errorNotification(
          "Erro ao carregar a lista de estados do Brasil. Por favor, atualize a página!"
        );
      });
  }, []);

  useEffect(() => {
    setCitiesLoading(true);

    axios
      .get(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf.key}/municipios`
      )
      .then((res) => {
        setCitiesLoading(false);
        setCities(res.data);
      })
      .catch((error) => {
        setCitiesLoading(false);
        errorNotification(
          "Erro ao carregar a lista de municípios deste estado. Por favor, atualize a página!"
        );
      });
  }, [selectedUf]);

  useEffect(() => {
    if (!props.location.profileType) {
      setNav("/register");
    }
  }, [props.location.profileType]);

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
    setPhoto({ url: "", file: null, loading: true });
    setSubmit({ disabled: true });

    const formData = new FormData();
    formData.append("api_key", "131724773834346");
    formData.append("upload_preset", "jpdyw4h7");
    formData.append("file", file);
    formData.append("folder", "institution-pictures");

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

  const registerInstitution = (values) => {
    setSubmit({ ...submit, loading: true });

    const verified = verificationStatus.unverified.type;
    const type =
      props.location.profileType === "ongAgent"
        ? institutionType.ong.type
        : institutionType.government.type;

    const finalForm = {
      ...values,
      verified,
      type,
      photo: photo.url,
    };

    console.log(finalForm);

    axios
      .post("/institutions/create", finalForm)
      .then(function (res) {
        successNotification(
          "Sua instituição foi cadastrada com sucesso! Aguarde que entraremos em contato para validá-la."
        );
        setSubmit({ ...submit, loading: false });
        setNav("/");
      })
      .catch(function (error) {
        if (error.response.status === 400) {
          errorNotification("CNPJ, E-mail ou Telefone já cadastrado.");
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
              <Button shape="circle">
                <Link
                  to={{
                    pathname: "/register/warning",
                    profileType: props.location.profileType,
                    warningText: warningTexts.createInstitution,
                    futurePath: "/register/institution",
                    backPath: "/register/user",
                  }}
                >
                  <LeftOutlined />
                </Link>
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
              Preencha seus dados
            </Text>
          </Divider>

          {/* Form */}
          <Row justify="center" style={{ marginTop: "24px" }}>
            <Form
              name="info"
              layout="vertical"
              style={{ width: "100%" }}
              initialValues={{ remember: true }}
              onFinish={registerInstitution}
            >
              {/* Person Name */}
              <Form.Item
                label="Seu Nome:"
                name="personName"
                hasFeedback
                rules={[
                  {
                    whitespace: true,
                    message: "Por favor, insira um nome válido!",
                  },
                  {
                    required: true,
                    message: "Por favor, insira seu nome!",
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

              {/* Person Email */}
              <Form.Item
                label="Seu E-mail:"
                name="personEmail"
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
                  placeholder="fulano@instituicao.com"
                  prefix={<MailOutlined />}
                />
              </Form.Item>

              <Divider plain>
                <Text type="secondary" style={{ fontSize: "16px" }}>
                  Preencha os dados da instituição
                </Text>
              </Divider>

              {/* Name */}
              <Form.Item
                style={{ marginTop: "24px" }}
                label="Nome da Instituição:"
                name="name"
                hasFeedback
                rules={[
                  {
                    whitespace: true,
                    message: "Por favor, insira um nome válido!",
                  },
                  {
                    required: true,
                    message: "Por favor, insira o nome da instituição!",
                  },
                ]}
              >
                <Input
                  size="large"
                  maxLength={60}
                  placeholder="Secretaria do Meio Ambiente de Brumadinho"
                  prefix={<UserOutlined />}
                />
              </Form.Item>

              {/* CNPJ */}
              <Form.Item
                label="CNPJ (caso possua):"
                name="cnpj"
                hasFeedback
                validateFirst
                rules={[
                  {
                    len: 14,
                    message: "Por favor, insira um CNPJ válido!",
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
                  mask="11.111.111/1111-11"
                  size="large"
                  maxLength={11}
                  placeholder="12.345.678/9012-34"
                  prefix={<SolutionOutlined />}
                />
              </Form.Item>

              {/* Email */}
              <Form.Item
                label="E-mail da Instituição:"
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
                    message: "Por favor, insira o e-mail da instituição!",
                  },
                ]}
              >
                <Input
                  size="large"
                  maxLength={40}
                  placeholder="emaildainstituicao@email.com"
                  prefix={<MailOutlined />}
                />
              </Form.Item>

              {/* Phone */}
              <Form.Item
                label="Telefone da Instituição:"
                name="phone"
                hasFeedback
                validateFirst
                rules={[
                  {
                    required: true,
                    message: "Por favor, insira o telefone da instituição!",
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
                  placeholder="MG - Minas Gerais"
                  getPopupContainer={(trigger) => trigger.parentElement}
                  optionFilterProp="children"
                  loading={ufsLoading}
                  size="large"
                  notFoundContent={<div> Nenhum Estado </div>}
                  filterOption={true}
                  onSelect={(value, option) => setSelectedUf(option)}
                >
                  {ufs.map((uf) => (
                    <Option key={uf.id} value={uf.sigla}>
                      {uf.sigla} - {uf.nome}
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
                    required: true,
                    message: "Por favor, selecione um município!",
                  },
                ]}
              >
                <Select
                  showSearch
                  placeholder="Brumadinho"
                  getPopupContainer={(trigger) => trigger.parentElement}
                  optionFilterProp="children"
                  loading={citiesLoading}
                  size="large"
                  notFoundContent={<div> Nenhum Município </div>}
                  filterOption={true}
                >
                  {cities.map((city) => (
                    <Option key={city.id} value={city.nome}>
                      {city.nome}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              {/* Photo */}
              <Form.Item
                name="photo"
                label="Adicione uma foto ou logo da instituição:"
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
                      <div className="ant-upload-text">
                        {photo.loading ? "Adicionando..." : "Adicionar"}
                      </div>
                    </div>
                  )}
                </Upload>
              </Form.Item>

              {/* Submit Button */}
              <Form.Item style={{ marginBottom: "0" }}>
                <Button
                  type="primary"
                  size="large"
                  className="primary-button"
                  htmlType="submit"
                  disabled={submit.disabled}
                  loading={submit.loading}
                  block
                >
                  Cadastrar Instituição
                </Button>
              </Form.Item>
            </Form>
          </Row>
        </Card>
      </div>
    );
  }
};

export default RegisterInstitution;
