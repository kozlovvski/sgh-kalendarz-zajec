import { Table, Typography } from "antd";
import Title from "antd/lib/typography/Title";
import firebase from "firebase/app";
import React, { useContext, useEffect, useState } from "react";

import { AppContext } from "../components/AppManager";
import BackButton from "../components/BackButton";
import NextButton from "../components/NextButton";
import { LecturesEntry } from "../ownTypes";

interface Props {}

const FetchLectures: React.FC<Props> = () => {
  const [lectures, setLectures] = useState<LecturesEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const {
    data: { inputLectures, type },
    changeData
  } = useContext(AppContext);

  useEffect(() => {
    const updateLectures = () => {
      return Promise.all(
        inputLectures.map(async ({ signature, group }) => {
          try {
            const snapshot = await firebase
              .firestore()
              .collection("lectures")
              .where("signature", "==", signature)
              .where("type", "==", type)
              .where("group", "==", group)
              .get();

            const newLectures = snapshot.docs.map(doc =>
              doc.data()
            ) as LecturesEntry[];
            setLectures(prev => [...prev, ...newLectures]);
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

  return (
    <div className="wrapper">
      <Title>4. Pobieranie przedmiotów</Title>
      <Typography.Paragraph>
        Poniżej wymienione są wszystkie przedmioty, które udało nam się znaleźć.
        Jeżeli wszystko się zgadza, przejdź dalej - wtedy dodamy wydarzenia do
        Twojego kalendarza.
      </Typography.Paragraph>
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
            width: 60
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
      <BackButton>Wstecz</BackButton>
      <NextButton type="primary" disabled={loading}>
        Dalej
      </NextButton>
    </div>
  );
};

export default FetchLectures;
