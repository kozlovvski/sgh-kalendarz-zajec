import React, { useContext, useEffect, useState } from "react";

import { AppContext } from "../components/AppManager";
import addClearCalendar from "../util/addClearCalendar";
import addEventToCalendar from "../util/addEventToCalendar";
import parseToEventList from "../util/parseToEventList";

interface Props {}

const UploadingLectures: React.FC<Props> = () => {
  const [done, setDone] = useState(false);
  const [progressData, setProgressData] = useState({ current: 0, to: 0 });

  const {
    data: { fetchedLectures }
  } = useContext(AppContext);

  useEffect(() => {
    const createEvents = async () => {
      const calendarId = await addClearCalendar();

      if (calendarId) {
        const individualEvents = fetchedLectures
          .map(lecture => parseToEventList(lecture, calendarId))
          .flat();

        if (individualEvents.length) {
          setProgressData(prev => ({ ...prev, to: individualEvents.length }));

          Promise.all(
            individualEvents.map(event => {
              return addEventToCalendar(event).then(res => {
                setProgressData(prev => ({
                  ...prev,
                  current: prev.current + 1
                }));
              });
            })
          ).then(() => {
            setDone(true);
          });
        }
      }
    };

    createEvents();
  }, []);

  return (
    <div className="wrapper">
      <p>{progressData.current + "/" + progressData.to}</p>
      <p>{done}</p>
    </div>
  );
};

export default UploadingLectures;
