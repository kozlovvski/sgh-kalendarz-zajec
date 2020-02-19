import { google } from "googleapis";

import { authManager } from "../components/AuthManager";
import { EventInput } from "../ownTypes";

const addEventToCalendar = (event: EventInput): Promise<any> => {
  const calendar = google.calendar({
    version: "v3",
    auth: authManager
  });

  return calendar.events.insert(event);
};

export default addEventToCalendar;
