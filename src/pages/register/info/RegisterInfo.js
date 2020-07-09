import React from "react";
import { Row, Col } from "antd";

import "./styles.css";

const RegisterInfo = (props) => {
  return (
    <div>
      <Row justify="center" gutter={[0, { xs: 32, sm: 40, md: 48, lg: 80 }]}>
        <Col span={24}></Col>
      </Row>

      <Row justify="center" gutter={[0, { xs: 16, sm: 16, md: 32, lg: 32 }]}>
        <Col xs={16} sm={16} md={12} lg={8} className="vertical-center">
          <div className="section-title">
            Preencha suas informações {props.location.profileType}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default RegisterInfo;
