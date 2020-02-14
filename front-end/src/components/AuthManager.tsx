import { google } from "googleapis";
import { clientId, clientSecret, redirectUri } from "../google.config";

export const authManager = new google.auth.OAuth2({
  clientId,
  clientSecret,
  redirectUri
});

export const scopes = ["https://www.googleapis.com/auth/calendar"];

export const url = authManager.generateAuthUrl({
  // 'online' (default) or 'offline' (gets refresh_token)
  access_type: "online",

  // If you only need one scope you can pass it as a string
  scope: scopes
});

export default authManager;
