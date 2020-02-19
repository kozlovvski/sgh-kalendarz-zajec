import { Col, Row } from "antd";
import React from "react";

import UserPanel from "./UserPanel";

interface Props {}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="full-height">
      <div className="app-panel">{children}</div>
      <div className="user-panel">
        <UserPanel />
      </div>
    </div>
  );
};

export default Layout;
