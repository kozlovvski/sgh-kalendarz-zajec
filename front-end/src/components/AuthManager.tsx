import { google } from "googleapis";

import { clientId, clientSecret, redirectUri } from "../google.config";

export const authManager = new google.auth.OAuth2({
  clientId,
  clientSecret,
  redirectUri
});

export const scope = ["https://www.googleapis.com/auth/calendar"];

export const url = authManager.generateAuthUrl({
  access_type: "offline",
  scope
});

export default authManager;
