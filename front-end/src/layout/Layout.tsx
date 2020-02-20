import { Col, Row, Icon } from "antd";
import React, { useState } from "react";

import UserPanel from "./UserPanel";

interface Props {}

const Layout: React.FC<Props> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="app" data-menu-open={isOpen}>
      <div className="app-panel">
        {children}
        <button
          className="user-panel-button user-panel-button--open"
          onClick={e => setIsOpen(true)}
        >
          Logowanie <Icon type="arrow-right" />
        </button>
      </div>
      <div className="user-panel">
        <UserPanel />
        <button
          className="user-panel-button user-panel-button--close"
          onClick={e => setIsOpen(false)}
        >
          <Icon type="arrow-left" /> Powrót
        </button>
      </div>
    </div>
  );
};

export default Layout;
