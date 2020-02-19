import React, { useContext, useEffect, useState } from "react";

import { AppContext } from "../components/AppManager";
import addClearCalendar from "../util/addClearCalendar";
import addEventToCalendar from "../util/addEventToCalendar";
import parseToEventList from "../util/parseToEventList";
import { Typography, Progress, Button, Icon, Steps } from "antd";
import { StepProps } from "antd/lib/steps";
import batchPromise from "../util/batchPromise";

interface Props {}

interface StepConfig {
  current: number;
  status: "wait" | "process" | "finish" | "error";
}

interface ProgressConfig {
  resolved: number;
  sent: number;
  to: number;
  status: "active" | "normal" | "success" | "exception";
}

const UploadingLectures: React.FC<Props> = () => {
  const [progressData, setProgressData] = useState<ProgressConfig>({
    sent: 0,
    resolved: 0,
    to: 20,
    status: "normal"
  });

  const [step, setStep] = useState<StepConfig>({
    current: 0,
    status: "process"
  });

  const stepData: StepProps[] = [
    {
      title: "Tworzenie kalendarza"
    },
    {
      title: "Dodawanie wydarzeń",
      description: (
        <Progress
          size="small"
          percent={(progressData.resolved * 100) / progressData.to}
          status={progressData.status}
        />
      )
    },
    {
      title: "Podsumowanie"
    }
  ];

  const {
    data: { fetchedLectures }
  } = useContext(AppContext);

  const createEvents = async () => {
    console.log("fired");
    const calendarId = await addClearCalendar();

    if (!calendarId) {
      setStep(prev => ({ ...prev, status: "error" }));
    } else {
      setStep(prev => ({ ...prev, current: prev.current + 1 }));

      const individualEvents = fetchedLectures
        .map(lecture => parseToEventList(lecture, calendarId))
        .flat();

      setProgressData({
        resolved: 0,
        sent: 0,
        to: individualEvents.length,
        status: "active"
      });

      if (individualEvents.length) {
        batchPromise(
          individualEvents.map(event => () => {
            setProgressData(prev => ({
              ...prev,
              sent: prev.sent + 1
            }));
            return addEventToCalendar(event).then(res => {
              setProgressData(prev => ({
                ...prev,
                resolved: prev.resolved + 1
              }));
            });
          }),
          8
        )
          .then(() => {
            setStep(prev => ({
              ...prev,
              status: "finish",
              current: prev.current + 1
            }));
            setProgressData(prev => ({ ...prev, status: "success" }));
          })
          .catch(err => {
            setProgressData(prev => ({ ...prev, status: "exception" }));
          });
      }
    }
  };

  useEffect(() => {
    createEvents();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="wrapper">
      <Typography.Title>5. Dodawanie wydarzeń</Typography.Title>
      <Typography.Paragraph>
        Twoje wydarzenia są aktualnie dodawane do kalendarza. Poniżej możesz
        śledzić postęp.
      </Typography.Paragraph>
      <Steps current={step.current} status={step.status} direction="vertical">
        {stepData.map((item, index) => (
          <Steps.Step
            {...item}
            icon={
              index === step.current && step.status === "process" ? (
                <Icon type="loading" />
              ) : null
            }
          />
        ))}
      </Steps>

      {step.status === "finish" && (
        <>
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
            Wszystkie wydarzenia zostały pomyślnie dodane. Teraz możesz
            wyświetlić swoje wydarzenia w przeglądarce lub telefonie i zrobić z
            nimi wszystko co z normalnym kalendarzem! Mamy nadzieję, że będziesz
            równie zadowolona/y co my!
          </Typography.Paragraph>
          <Button
            icon="link"
            href="https://calendar.google.com/"
            target="_blank"
            className="calendar-button"
          >
            Otwórz Kalendarz Google
          </Button>
        </>
      )}

      {step.status === "error" && (
        <>
          <Typography.Title>
            <Icon
              type="close-circle"
              theme="twoTone"
              twoToneColor="#ff0000"
              style={{ marginRight: "0.3em" }}
            />
            Ups! Coś poszło nie tak.
          </Typography.Title>
          <Typography.Paragraph>
            Tylko część wydarzeń została dodana. Możesz spróbować ponownie
            klikając poniżej
          </Typography.Paragraph>
          <Button type="primary">Spróbuj ponownie</Button>
        </>
      )}
    </div>
  );
};

export default UploadingLectures;
