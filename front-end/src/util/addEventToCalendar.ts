import { authManager } from "../components/AuthManager";
import { LecturesEntry, EventInput } from "../ownTypes";
import { google } from "googleapis";
import parseDateTime from "./parseDateTime";

const addEventToCalendar = (event: EventInput): Promise<any> => {
  const calendar = google.calendar({
    version: "v3",
    auth: authManager
  });

  return calendar.events.insert(event);
};

export default addEventToCalendar;
