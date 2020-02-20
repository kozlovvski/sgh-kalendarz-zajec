import { Typography, Icon } from "antd";
import React, { useContext } from "react";

import { UserContext } from "../components/AuthManager";
import LoginButton from "../components/LoginButton";
import LogoutButton from "../components/LogoutButton";
import { AppContext } from "../components/AppManager";
import { Link } from "react-router-dom";

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
    <Typography.Paragraph>
      Logując się wyrażasz zgodę na wykorzystanie Twoich danych zgodnie z{" "}
      <Link to="/polityka-prywatnosci">Polityką Prywatności</Link>.
    </Typography.Paragraph>
  </div>
);

const UserPanel: React.FC<Props> = () => {
  const { user, setUser } = useContext(UserContext);
  const {
    data: { isLoggingIn }
  } = useContext(AppContext);

  return user ? (
    <Welcome />
  ) : isLoggingIn ? (
    <Icon type="loading" style={{ fontSize: 40 }} />
  ) : (
    <Login />
  );
};

export default UserPanel;
