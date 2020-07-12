import React from "react";
import { Row, Col, Button } from "antd";
import { Link } from "react-router-dom";
import { RightCircleFilled } from "@ant-design/icons";

import "./styles.css";

const RegisterProfile = () => {
  return (
    <div>
      <Row justify="center" gutter={[0, { xs: 32, sm: 40, md: 48, lg: 80 }]}>
        <Col span={24}></Col>
      </Row>

      <Row justify="center" gutter={[0, { xs: 16, sm: 16, md: 32, lg: 32 }]}>
        <Col xs={20} sm={16} md={12} lg={8} className="vertical-center">
          <div className="section-title">Qual seu tipo de perfil?</div>
        </Col>
      </Row>

      <Row justify="center" gutter={[0, { xs: 16, sm: 16, md: 20, lg: 20 }]}>
        <Col xs={20} sm={16} md={12} lg={8} className="vertical-center">
          <Button
            type="primary"
            size="large"
            className="primary-button height-button collaboration"
            block
          >
            <Link to={{ pathname: "/register/info", profileType: "user" }}>
              <div className="height-button-all">
                <div className="height-button-content">
                  <p className="title-height-button">Usuário Comum</p>
                  <p className="text-height-button">
                    Quero registar denúncias e ver denúncias de outros usuários.
                  </p>
                </div>
                <div className="height-button-icon">
                  <RightCircleFilled style={{ fontSize: "28px" }} />
                </div>
              </div>
            </Link>
          </Button>
        </Col>
      </Row>

      <Row justify="center" gutter={[0, { xs: 16, sm: 16, md: 20, lg: 20 }]}>
        <Col xs={20} sm={16} md={12} lg={8} className="vertical-center">
          <Button
            type="primary"
            size="large"
            className="primary-button height-button people"
            block
          >
            <Link to={{ pathname: "/register/info", profileType: "ong" }}>
              <div className="height-button-all">
                <div className="height-button-content">
                  <p className="title-height-button">Org. Não-Governamental</p>
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
        </Col>
      </Row>

      <Row justify="center" gutter={[0, { xs: 16, sm: 16, md: 20, lg: 20 }]}>
        <Col xs={20} sm={16} md={12} lg={8} className="vertical-center">
          <Button
            type="primary"
            size="large"
            className="primary-button height-button analisys"
            block
          >
            <Link to={{ pathname: "/register/info", profileType: "public" }}>
              <div className="height-button-all">
                <div className="height-button-content">
                  <p className="title-height-button">Órgão Público Ambiental</p>
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
        </Col>
      </Row>
    </div>
  );
};

export default RegisterProfile;
