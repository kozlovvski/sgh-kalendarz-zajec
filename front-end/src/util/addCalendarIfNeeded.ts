import { google } from "googleapis";
import { authManager } from "../components/AuthManager";

const addCalendarIfNeeded = async (): Promise<boolean> => {
  const calendar = google.calendar({
    version: "v3",
    auth: authManager
  });

  const calendarList = await calendar.calendarList.list();

  const ourCalendar = calendarList.data.items?.find(
    item => item.summary === "SGH - zajęcia"
  );

  if (!ourCalendar) {
    await calendar.calendars
      .insert({
        requestBody: {
          summary: "SGH - zajęcia",
          timeZone: "Europe/Warsaw"
        }
      })
      .catch(err => {
        return false;
      });
    return true;
  } else {
    return false;
  }
};

export default addCalendarIfNeeded;
