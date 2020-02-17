import firebase from "firebase/app";
import { google } from "googleapis";
import React, { useContext } from "react";

import { authManager, UserContext } from "../components/AuthManager";
import loginUser from "../util/loginUser";
import logoutUser from "../util/logoutUser";
import { Input, Typography, Button } from "antd";
import Title from "antd/lib/typography/Title";
import { ViewContext } from "../components/ViewManager";

interface Props {}

const AddSignatures: React.FC<Props> = () => {
  const { changeView } = useContext(ViewContext);

  return (
    <div className="wrapper">
      <Title>1. Dodaj przedmioty</Title>
      <Typography>
        Ta aplikacja pozwoli Ci w wygodny sposób dodać swoje przedmioty do
        Kalendarza Google. Skopiuj listę sygnatur z{" "}
        <a href="https://dziekanat.sgh.waw.pl/" target="_blank">
          Wirtualnego Dziekanatu
        </a>
        , a my zajmiemy się resztą!
      </Typography>
      <Button type="primary" onClick={e => changeView(1)}>
        Zaczynamy!
      </Button>
    </div>
  );
};

export default AddSignatures;
