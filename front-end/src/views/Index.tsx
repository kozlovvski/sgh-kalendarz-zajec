import firebase from "firebase/app";
import { google } from "googleapis";
import React, { useContext } from "react";

import { authManager, UserContext } from "../components/AuthManager";
import loginUser from "../util/loginUser";
import logoutUser from "../util/logoutUser";

interface Props {}

const Index: React.FC<Props> = () => {
  const { user } = useContext(UserContext);

  const handleLogin = () => {
    loginUser()
      .then(res => {
        console.log("logged in!");
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleLogout = () => {
    logoutUser()
      .then(() => {
        console.log("logged out!");
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleAddCalendar = async () => {
    const calendar = google.calendar({
      version: "v3",
      auth: authManager
    });
    const calendarList = await calendar.calendarList.list();
    let ourCalendar = calendarList.data.items?.find(
      item =>
        item.summary === "SGH - zajęcia" ||
        item.summaryOverride === "SGH - zajęcia"
    );
    if (ourCalendar) {
      console.log("Już jest", ourCalendar);
    } else {
      calendar.calendars
        .insert({
          requestBody: {
            summary: "SGH - zajęcia",
            timeZone: "Europe/Warsaw"
          }
        })
        .then(res => console.log("Nowy", res))
        .catch(err => {
          console.log(err);
        });
    }
  };

  return (
    <div>
      Zalogowany: {user ? "tak" : "nie"};
      {user ? (
        <button
          onClick={e => {
            handleLogout();
          }}
        >
          Wyloguj firebase
        </button>
      ) : (
        <button
          onClick={e => {
            handleLogin();
          }}
        >
          Zaloguj firebase
        </button>
      )}
      <button
        onClick={e => {
          console.log(authManager.credentials);
        }}
      >
        Show credentials
      </button>
      <button
        onClick={e => {
          const calendar = google.calendar({
            version: "v3",
            auth: authManager
          });
          calendar.calendarList
            .list()
            .then(res => {
              console.log(res);
            })
            .catch(err => {
              console.log(err);
            });
        }}
      >
        Show calendars
      </button>
      <button onClick={e => handleAddCalendar()}>Add calendar</button>
      <button
        onClick={e => {
          console.log(firebase.auth().currentUser);
        }}
      >
        Show firebase user
      </button>
      <button
        onClick={e => {
          firebase
            .firestore()
            .collection("lectures")
            .get()
            .then(snapshot => {
              console.log(snapshot.docs.map(doc => doc.data()));
            });
        }}
      >
        Show lectures
      </button>
    </div>
  );
};

export default Index;
