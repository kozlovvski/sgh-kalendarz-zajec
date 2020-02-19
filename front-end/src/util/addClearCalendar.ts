import { google } from "googleapis";
import { authManager } from "../components/AuthManager";

const addClearCalendar = () => {
  const calendar = google.calendar({
    version: "v3",
    auth: authManager
  });

  const calendarToPut = {
    summary: "SGH - zajęcia",
    timeZone: "Europe/Warsaw"
  };

  return calendar.calendarList.list().then(calendarList => {
    const ourCalendar = calendarList.data.items?.find(
      item => item.summary === "SGH - zajęcia"
    );

    if (ourCalendar) {
      calendar.calendars.delete({
        calendarId: ourCalendar.id!
      });
    }

    return calendar.calendars
      .insert({
        requestBody: calendarToPut
      })
      .then(res => res.data.id);
  });
};

export default addClearCalendar;
