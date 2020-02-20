import { Table, Typography, Tag } from "antd";
import Title from "antd/lib/typography/Title";
import firebase from "firebase/app";
import React, { useContext, useEffect, useState } from "react";

import { AppContext } from "../components/AppManager";
import BackButton from "../components/BackButton";
import NextButton from "../components/NextButton";
import { LecturesEntry, InputLecture } from "../ownTypes";

interface Props {}

const FetchLectures: React.FC<Props> = () => {
  const [lectures, setLectures] = useState<LecturesEntry[]>([]);
  const [failedLectures, setFailedLectures] = useState<InputLecture[]>([]);
  const [loading, setLoading] = useState(true);

  const {
    data: { inputLectures, type },
    changeData
  } = useContext(AppContext);

  useEffect(() => {
    const updateLectures = () => {
      return Promise.all(
        inputLectures.map(async lecture => {
          try {
            const snapshot = await firebase
              .firestore()
              .collection("lectures")
              .where("signature", "==", lecture.signature)
              .where("type", "==", type)
              .where("group", "==", lecture.group)
              .get();

            const newLectures = snapshot.docs.map(doc =>
              doc.data()
            ) as LecturesEntry[];

            if (newLectures.length > 0) {
              setLectures(prev => [...prev, ...newLectures]);
            } else {
              setFailedLectures(prev => [...prev, lecture]);
            }
          } catch (err) {
            console.log("error fetching lectures", err);
          }
        })
      );
    };

    updateLectures().then(() => {
      setLoading(false);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    changeData({ fetchedLectures: lectures });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lectures]);

  const tableColumns = [
    {
      title: "Sygnatura",
      dataIndex: "signature",
      key: "signature"
    },
    {
      title: "Przedmiot",
      dataIndex: "name",
      key: "name",
      ellipsis: true
    },
    {
      title: "Grupa",
      dataIndex: "group",
      key: "group",
      ellipsis: true
    },
    {
      title: "Forma",
      dataIndex: "form",
      key: "form",
      ellipsis: true
    },
    {
      title: "Wykładowca",
      dataIndex: "lecturer",
      key: "lecturer",
      ellipsis: true
    }
  ];

  const DesktopTable = () => (
    <Table
      dataSource={lectures}
      pagination={false}
      loading={loading}
      size="small"
      className="lectures-table"
      columns={[
        {
          title: "Sygnatura",
          dataIndex: "signature",
          key: "signature"
        },
        {
          title: "Przedmiot",
          dataIndex: "name",
          key: "name",
          ellipsis: true
        },
        {
          title: "Grupa",
          dataIndex: "group",
          key: "group",
          width: 70
        },
        {
          title: "Forma",
          dataIndex: "form",
          key: "form",
          width: 70
        },
        {
          title: "Wykładowca",
          dataIndex: "lecturer",
          key: "lecturer",
          ellipsis: true
        }
      ]}
      expandedRowRender={item => (
        <Table
          size="small"
          pagination={false}
          dataSource={item.dates.map(date => ({
            place: item.place,
            start_time: item.start_time,
            end_time: item.end_time,
            date
          }))}
          className="inner-table"
          columns={[
            { title: "Sala", dataIndex: "place", key: "place" },
            {
              title: "Od",
              dataIndex: "start_time",
              key: "start_time"
            },
            { title: "Do", dataIndex: "end_time", key: "end_time" },
            { title: "Data", dataIndex: "date", key: "date" }
          ]}
        />
      )}
    />
  );

  const MobileTable = () => (
    <Table
      dataSource={lectures}
      pagination={false}
      loading={loading}
      size="small"
      className="lectures-table"
      columns={[
        {
          title: "Przedmiot",
          dataIndex: "name",
          key: "name",
          ellipsis: true
        },
        {
          title: "Forma",
          dataIndex: "form",
          key: "form",
          width: 50
        },
        {
          title: "Wykładowca",
          dataIndex: "lecturer",
          key: "lecturer",
          ellipsis: true
        }
      ]}
      expandedRowRender={item => (
        <Table
          size="small"
          pagination={false}
          dataSource={item.dates.map(date => ({
            place: item.place,
            start_time: item.start_time,
            end_time: item.end_time,
            date
          }))}
          className="inner-table"
          columns={[
            { title: "Sala", dataIndex: "place", key: "place" },
            {
              title: "Od",
              dataIndex: "start_time",
              key: "start_time"
            },
            { title: "Do", dataIndex: "end_time", key: "end_time" },
            { title: "Data", dataIndex: "date", key: "date" }
          ]}
        />
      )}
    />
  );

  return (
    <div className="wrapper">
      <Title>4. Pobieranie przedmiotów</Title>
      <Typography.Paragraph>
        Poniżej wymienione są wszystkie przedmioty, które udało nam się znaleźć.
        Jeżeli wszystko się zgadza, przejdź dalej - wtedy dodamy wydarzenia do
        Twojego kalendarza.
      </Typography.Paragraph>

      {window.innerWidth <= 600 ? <MobileTable /> : <DesktopTable />}

      {failedLectures.length !== 0 && (
        <>
          <Typography.Title level={4}>
            Nieodnalezione przedmioty:
          </Typography.Title>
          {failedLectures.map(item => (
            <Tag>
              <b>Sygnatura: </b>
              {item.signature} <b>Grupa: </b>
              {item.group}
            </Tag>
          ))}
          <Typography.Paragraph>
            Nasza baza jest złożona z plików .xls udostępnianych przez dziekanat
            na swojej stronie, dlatego nie jesteśmy w stanie znaleźć np.:
          </Typography.Paragraph>
          <ul>
            <li>lektoratów</li>
            <li>wychowania fizycznego</li>
            <li>
              e-learningów (przez to, że grupy w WD nie pokrywają się z tymi w
              plikach udostępnianych przez dziekanat)
            </li>
          </ul>
          <Typography.Paragraph>
            Jeżeli uważasz, że wystąpił błąd, skontaktuj się proszę z nami pod
            adresem <a href="mailto:michal@kozlovv.ski">michal@kozlovv.ski</a> i
            postaramy się to naprawić.
          </Typography.Paragraph>
        </>
      )}
      <BackButton>Wstecz</BackButton>
      <NextButton type="primary" disabled={loading}>
        Dalej
      </NextButton>
    </div>
  );
};

export default FetchLectures;
