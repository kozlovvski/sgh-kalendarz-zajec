import React from "react";
import { Col, Row } from "antd";

interface Props {}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <Row type="flex" className="full-height">
      <Col span={16} className="app-panel">
        {children}
      </Col>
      <Col span={8} className="user-panel">
        elo
      </Col>
    </Row>
  );
};

export default Layout;
