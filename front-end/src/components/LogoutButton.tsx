import React, { MouseEvent, useContext } from "react";
import logoutUser from "../util/logoutUser";
import { Button } from "antd";
import { AppContext } from "./AppManager";

interface Props {}

const LogoutButton: React.FC<Props> = () => {
  const { changeData } = useContext(AppContext);
  const handleLogout = (e: MouseEvent) => {
    logoutUser()
      .then(() => {
        changeData({ view: 0 });
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
