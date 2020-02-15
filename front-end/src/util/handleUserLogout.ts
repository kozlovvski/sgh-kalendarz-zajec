export default function handleLoginFromLocalStorage() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("expiry_date");
  localStorage.removeItem("refresh_token");
}
