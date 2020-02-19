import { Spin, Typography } from "antd";
import Title from "antd/lib/typography/Title";
import firebase from "firebase/app";
import React, { useContext, useEffect, useState } from "react";

import { UserContext } from "../components/AuthManager";
import LoginButton from "../components/LoginButton";
import LogoutButton from "../components/LogoutButton";

interface Props {
  children?: never;
}

const Welcome: React.FC = () => {
  const { user } = useContext(UserContext);

  return (
    <div>
      <Title>
        Witaj,<span className="blue-text"> {user?.displayName}</span>
      </Title>
      <Typography>Dobrze Cię widzieć.</Typography>
      <LogoutButton />
    </div>
  );
};

const Login: React.FC = () => (
  <div>
    <Title>Witaj!</Title>
    <LoginButton />
  </div>
);

const UserPanel: React.FC<Props> = () => {
  // const { user, setUser } = useContext(UserContext);
  // const [loadingUser, setLoadingUser] = useState<boolean>(true);

  // useEffect(() => {
  //   firebase.auth().onAuthStateChanged(user => {
  //     // TODO: check how to update googleapis tokens if they expired.
  //     // Probably will need to change GoogleAuthProvider to signing in with credentials
  //     // https://stackoverflow.com/questions/49929134/how-to-get-refresh-token-for-google-api-using-firebase-authentication
  //     setUser(user);
  //     setLoadingUser(false);
  //   });

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // return loadingUser ? <Spin /> : user ? <Welcome /> : <Login />;
  return <Login />;
};

export default UserPanel;
