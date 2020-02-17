import React, { MouseEvent } from "react";
import logoutUser from "../util/logoutUser";
import { Button } from "antd";

interface Props {}

const LogoutButton: React.FC<Props> = () => {
  const handleLogout = (e: MouseEvent) => {
    logoutUser()
      .then(() => {
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
