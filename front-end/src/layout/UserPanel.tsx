import { Spin, Typography } from "antd";
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
    <div style={{ maxWidth: 350 }}>
      <Typography.Title level={3}>
        Witaj,<span className="blue-text"> {user?.displayName}</span>
      </Typography.Title>
      <Typography.Paragraph>Dobrze Cię widzieć.</Typography.Paragraph>
      <LogoutButton />
    </div>
  );
};

const Login: React.FC = () => (
  <div style={{ maxWidth: 350 }}>
    <Typography.Title level={3}>Pierwszy raz tutaj?</Typography.Title>
    <Typography.Paragraph>
      Możesz przetestować aplikację bez logowania! Gdy zdecydujesz się dodać
      przedmioty do kalendarza, zwyczajnie zaloguj się swoim Kontem Google.
    </Typography.Paragraph>
    <LoginButton />
  </div>
);

const UserPanel: React.FC<Props> = () => {
  const { user, setUser } = useContext(UserContext);
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
  return user ? <Welcome /> : <Login />;
};

export default UserPanel;
