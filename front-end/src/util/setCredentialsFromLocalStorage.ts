import { authManager } from "../components/AuthManager";

const setCredentialsFromLocalStorage = () => {
  const access_token = sessionStorage.getItem("access_token");
  const id_token = sessionStorage.getItem("id_token");

  authManager.setCredentials({
    access_token,
    id_token
  });
};

export default setCredentialsFromLocalStorage;
