import React, { MouseEvent } from "react";

import loginUser from "../util/loginUser";

interface Props {}

const LoginButton: React.FC<Props> = () => {
  return (
    <div
      className="google-btn"
      onClick={e => {
        loginUser();
      }}
    >
      <div className="google-icon-wrapper">
        <img
          className="google-icon"
          alt="Google logo"
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
