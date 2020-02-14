import React from "react";
import authManager, { url } from "../components/AuthManager";

interface Props {}

const Index: React.FC<Props> = () => {
  return (
    <div>
      <a href={url}>Zaloguj</a>
      <button
        onClick={e => {
          console.log(authManager.credentials);
        }}
      >
        Show credentials
      </button>
    </div>
  );
};

export default Index;
