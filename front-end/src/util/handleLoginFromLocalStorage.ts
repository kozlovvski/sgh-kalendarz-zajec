import authManager from "../components/AuthManager";

export default function handleLoginFromLocalStorage() {
  const access_token = localStorage.getItem("access_token");
  const expiry_date = localStorage.getItem("expiry_date");
  const refresh_token = localStorage.getItem("refresh_token");

  if (access_token && expiry_date) {
    if (new Date() > new Date(expiry_date)) {
      if (refresh_token) {
        // TODO: reauthorize user from refresh_token
      } else {
        // TODO: visualize that the access has expired and user needs to log in
      }
    } else {
      authManager.setCredentials({
        access_token,
        expiry_date: Number(expiry_date),
        refresh_token
      });
    }
  }
}
