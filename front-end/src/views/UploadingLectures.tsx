import React, { useContext, useEffect, useState } from "react";

import { AppContext } from "../components/AppManager";
import addClearCalendar from "../util/addClearCalendar";
import addEventToCalendar from "../util/addEventToCalendar";
import parseToEventList from "../util/parseToEventList";
import { Typography, Progress, Button, Icon } from "antd";

interface Props {}

const UploadingLectures: React.FC<Props> = () => {
  const [progressData, setProgressData] = useState<{
    current: number;
    to: number;
    status: "active" | "normal" | "success" | "exception";
  }>({ current: 0, to: 20, status: "active" });

  const {
    data: { fetchedLectures }
  } = useContext(AppContext);

  // useEffect(() => {
  //   const createEvents = async () => {
  //     const calendarId = await addClearCalendar();

  //     if (calendarId) {
  //       const individualEvents = fetchedLectures
  //         .map(lecture => parseToEventList(lecture, calendarId))
  //         .flat();

  //       if (individualEvents.length) {
  //         setProgressData(prev => ({ ...prev, to: individualEvents.length }));

  //         Promise.all(
  //           individualEvents.map(event => {
  //             return addEventToCalendar(event).then(res => {
  //               setProgressData(prev => ({
  //                 ...prev,
  //                 current: prev.current + 1
  //               }));
  //             });
  //           })
  //         ).then(() => {
  //           setDone(true);
  //         });
  //       }
  //     }
  //   };

  //   createEvents();
  // }, []);

  return (
    <div className="wrapper">
      <Typography.Title>5. Dodawanie wydarzeń</Typography.Title>
      <Typography.Paragraph>
        Twoje wydarzenia są aktualnie dodawane do kalendarza. Poniżej możesz
        śledzić postęp.
      </Typography.Paragraph>
      <Progress
        percent={(progressData.current * 100) / progressData.to}
        status={progressData.status}
      />
      <p>{progressData.current + "/" + progressData.to}</p>
      <button
        onClick={e => setProgressData(prev => ({ ...prev, status: "success" }))}
      >
        done
      </button>
      <button
        onClick={e =>
          setProgressData(prev => ({ ...prev, current: prev.current + 1 }))
        }
      >
        Dodaj
      </button>

      <Typography.Title>
        <Icon
          type="check-circle"
          theme="twoTone"
          twoToneColor="#52c41a"
          style={{ marginRight: "0.3em" }}
        />
        I gotowe!
      </Typography.Title>
      <Typography.Paragraph>
        Wszystkie wydarzenia zostały pomyślnie dodane. Teraz możesz wyświetlić
        swoje wydarzenia w przeglądarce lub telefonie i zrobić z nimi wszystko
        co z normalnym kalendarzem! Mamy nadzieję, że będziesz równie
        zadowolona/y co my!
      </Typography.Paragraph>
      <Button
        icon="link"
        href="https://calendar.google.com/"
        target="_blank"
        className="calendar-button"
      >
        Otwórz Kalendarz Google
      </Button>
    </div>
  );
};

export default UploadingLectures;
