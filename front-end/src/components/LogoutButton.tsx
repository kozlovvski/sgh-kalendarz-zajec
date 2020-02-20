import React, { MouseEvent, useContext } from "react";
import logoutUser from "../util/logoutUser";
import { Button } from "antd";
import { AppContext, initialAppData } from "./AppManager";

interface Props {}

const LogoutButton: React.FC<Props> = () => {
  const { changeData } = useContext(AppContext);
  const handleLogout = (e: MouseEvent) => {
    logoutUser()
      .then(() => {
        changeData(initialAppData);
        console.log("logged out!");
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <Button type="primary" onClick={handleLogout}>
      Wyloguj się
    </Button>
  );
};

export default LogoutButton;
