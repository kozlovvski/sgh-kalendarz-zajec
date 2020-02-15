import React from "react";
import authManager, { url } from "../components/AuthManager";
import handleUserLogout from "../util/handleUserLogout";
import { google } from "googleapis";

interface Props {}

const Index: React.FC<Props> = () => {
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
      {authManager.credentials.access_token ? (
        <button
          onClick={e => {
            handleUserLogout();
          }}
        >
          Wyloguj
        </button>
      ) : (
        <a href={url}>Zaloguj</a>
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
    </div>
  );
};

export default Index;
