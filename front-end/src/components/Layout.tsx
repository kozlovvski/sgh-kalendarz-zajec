import React from "react";
import { Col, Row } from "antd";

interface Props {}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <Row>
      <Col span={16}>{children}</Col>
      <Col span={8}>elo</Col>
    </Row>
  );
};

export default Layout;
