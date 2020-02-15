import { google } from "googleapis";
import { Credentials } from "google-auth-library";
import React, { useState } from "react";
import firebase from "firebase/app";

import { clientId, clientSecret, redirectUri } from "../google.config";

export const authManager = new google.auth.OAuth2({
  clientId,
  clientSecret,
  redirectUri
});

// export const scope = ["https://www.googleapis.com/auth/calendar"];

// export const url = authManager.generateAuthUrl({
//   access_type: "offline",
//   scope
// });

export type AppUser = firebase.User | null;

export const UserContext = React.createContext<{
  user: AppUser;
  setUser: (data: AppUser) => void;
}>({
  user: null,
  setUser(data: AppUser) {
    console.log("Not loaded yet");
  }
});

export const UserContextProvider: React.FC = ({ children }) => {
  const [state, setState] = useState<AppUser>(null);

  const setUser = (data: AppUser) => {
    setState(data);
  };

  return (
    <UserContext.Provider value={{ user: state, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
