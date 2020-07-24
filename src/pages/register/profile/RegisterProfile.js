import React, { useState } from "react";
import { Row, Col, Button, Card, Typography, Divider } from "antd";
import { Link, Redirect } from "react-router-dom";
import { RightCircleFilled, LeftOutlined } from "@ant-design/icons";

import "./styles.css";

const { Title, Text } = Typography;
const logo = require("../../../assets/images/logo_512.png");

const RegisterProfile = () => {
  const [nav, setNav] = useState(null);

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
                Cadastrar
              </Title>
            </Col>
          </Row>

          <Divider plain>
            <Text type="secondary" style={{ fontSize: "16px" }}>
              Selecione o seu tipo de perfil
            </Text>
          </Divider>

          <Row justify="center">
            <Button
              type="primary"
              size="large"
              className="primary-button height-button collaboration"
              block
            >
              <Link to={{ pathname: "/register/user", profileType: "common" }}>
                <div className="height-button-all">
                  <div className="height-button-content">
                    <p className="title-height-button">Usuário Comum</p>
                    <p className="text-height-button">
                      Quero registar denúncias e ver denúncias de outros
                      usuários.
                    </p>
                  </div>
                  <div className="height-button-icon">
                    <RightCircleFilled style={{ fontSize: "28px" }} />
                  </div>
                </div>
              </Link>
            </Button>
          </Row>

          <Row justify="center">
            <Button
              type="primary"
              size="large"
              className="primary-button height-button people"
              block
            >
              <Link
                to={{ pathname: "/register/user", profileType: "ongAgent" }}
              >
                <div className="height-button-all">
                  <div className="height-button-content">
                    <p className="title-height-button">
                      Org. Não-Governamental
                    </p>
                    <p className="text-height-button">
                      Participa da validação de denúncias e ações ambientais.
                    </p>
                  </div>
                  <div className="height-button-icon">
                    <RightCircleFilled style={{ fontSize: "28px" }} />
                  </div>
                </div>
              </Link>
            </Button>
          </Row>

          <Row justify="center">
            <Button
              type="primary"
              size="large"
              className="primary-button height-button analisys"
              block
            >
              <Link
                to={{
                  pathname: "/register/user",
                  profileType: "governmentAgent",
                }}
              >
                <div className="height-button-all">
                  <div className="height-button-content">
                    <p className="title-height-button">
                      Órgão Público Ambiental
                    </p>
                    <p className="text-height-button">
                      Entidade responsável por analisar e dar procedimento às
                      denúncias.
                    </p>
                  </div>
                  <div className="height-button-icon">
                    <RightCircleFilled style={{ fontSize: "28px" }} />
                  </div>
                </div>
              </Link>
            </Button>
          </Row>
        </Card>
      </div>
    );
  }
};

export default RegisterProfile;
