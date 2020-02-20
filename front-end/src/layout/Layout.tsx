import { Col, Row, Icon, Spin } from "antd";
import React, { useState, useContext } from "react";
import { AppContext } from "../components/AppManager";
import UserPanel from "./UserPanel";
import { UserContext } from "../components/AuthManager";

interface Props {}

const Layout: React.FC<Props> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    data: { isLoggingIn }
  } = useContext(AppContext);
  const { user } = useContext(UserContext);

  return (
    <div className="app" data-menu-open={isOpen}>
      <div className="app-panel">
        {children}
        <button
          className="user-panel-button user-panel-button--open"
          disabled={isLoggingIn}
          onClick={e => setIsOpen(true)}
        >
          {user ? (
            <>
              Twój profil <Icon type="arrow-right" />
            </>
          ) : isLoggingIn ? (
            <Icon type="loading" />
          ) : (
            <>
              Logowanie <Icon type="arrow-right" />
            </>
          )}
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
