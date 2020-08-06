import React, { useEffect, useState } from "react";
import { Row, Col, Button, Card, Typography, Divider } from "antd";
import { Link, Redirect } from "react-router-dom";
import { LeftOutlined, InfoCircleOutlined } from "@ant-design/icons";

import "./styles.css";

const { Title, Text } = Typography;
const logo = require("../../assets/images/logo_512.png");

const WarningPage = (props) => {
  const [nav, setNav] = useState(null);

  useEffect(() => {
    if (!props.location.warningText) {
      setNav("/");
    }
  }, [props.location.warningText]);

  if (nav) return <Redirect to={nav} />;
  else {
    return (
      <div className="card-container">
        <Card className="card-box" bordered={false}>
          <Row justify="center" gutter={16} style={{ paddingBottom: "16px" }}>
            <Col span={4} style={{ alignSelf: "center" }}>
              <Button shape="circle">
                <Link
                  to={{
                    pathname: props.location.backPath,
                    profileType: props.location.profileType,
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
                Aviso
              </Title>
            </Col>
          </Row>

          <Divider plain>
            <InfoCircleOutlined style={{ color: "#338221" }} />
          </Divider>

          <Row justify="center" style={{ marginBottom: "32px" }}>
            <Col style={{ textAlign: "center" }}>
              <Text type="secondary">{props.location.warningText}</Text>
            </Col>
          </Row>

          <Button
            type="primary"
            htmlType="submit"
            size="large"
            className="primary-button"
            block
          >
            <Link
              to={{
                pathname: props.location.futurePath,
                profileType: props.location.profileType,
                futurePath: props.location.futurePath,
                backPath: props.location.backPath,
              }}
            >
              Entendi
            </Link>
          </Button>
        </Card>
      </div>
    );
  }
};

export default WarningPage;
