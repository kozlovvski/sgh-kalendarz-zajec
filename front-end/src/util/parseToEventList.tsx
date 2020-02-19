import { EventInput, LecturesEntry } from "../ownTypes";
import parseDateTime from "./parseDateTime";

const parseToEventList = (
  lecture: LecturesEntry,
  calendarId: string
): EventInput[] => {
  return lecture.dates.map(date => {
    const returnValue: EventInput = {
      calendarId,
      requestBody: {
        summary: `${lecture.form}: ${lecture.name}`,
        description: `Wykładowca: ${lecture.lecturer}
Nr grupy: ${lecture.group}
Sygnatura: ${lecture.signature}
      
Wygenerowano za pomocą <a href="https://kalendarz-sgh.kozlovv.ski">kalendarz-sgh.kozlovv.ski</a>
Kontakt z autorem: <a href="mailto:michal@kozlovv.ski">michal@kozlovv.ski</a>
`,
        start: {
          dateTime: parseDateTime(date, lecture.start_time),
          timeZone: "Europe/Warsaw"
        },
        end: {
          dateTime: parseDateTime(date, lecture.end_time),
          timeZone: "Europe/Warsaw"
        },
        location: lecture.place
      }
    };

    return returnValue;
  });
};

export default parseToEventList;
