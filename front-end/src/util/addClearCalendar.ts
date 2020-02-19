import { google } from "googleapis";
import { authManager } from "../components/AuthManager";

const addClearCalendar = async (): Promise<void> => {
  const calendar = google.calendar({
    version: "v3",
    auth: authManager
  });

  const calendarToPut = {
    summary: "SGH - zajęcia",
    timeZone: "Europe/Warsaw"
  };

  const calendarList = await calendar.calendarList.list();

  const ourCalendar = calendarList.data.items?.find(
    item => item.summary === "SGH - zajęcia"
  );

  if (!ourCalendar) {
    calendar.calendars
      .insert({
        requestBody: calendarToPut
      })
      .catch(err => {
        return err;
      });
  } else {
    calendar.calendars
      .delete({
        calendarId: ourCalendar.id!
      })
      .catch(err => {
        return err;
      });

    calendar.calendars
      .insert({
        requestBody: calendarToPut
      })
      .catch(err => {
        return err;
      });
  }
};

export default addClearCalendar;
