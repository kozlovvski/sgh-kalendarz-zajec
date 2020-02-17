import React, { MouseEvent } from "react";

import loginUser from "../util/loginUser";

interface Props {}

const LoginButton: React.FC<Props> = () => {
  const handleLogout = (e: MouseEvent) => {
    loginUser()
      .then(() => {
        console.log("logged in!");
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className="google-btn" onClick={handleLogout}>
      <div className="google-icon-wrapper">
        <img
          className="google-icon"
          src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
        />
      </div>
      <p className="btn-text">
        <b>Zaloguj się przez Google</b>
      </p>
    </div>
  );
};

export default LoginButton;
