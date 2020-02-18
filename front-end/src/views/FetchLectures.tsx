import { Typography, Input, Tag, Table, List } from "antd";
import Title from "antd/lib/typography/Title";
import React, { useState, ChangeEvent, useContext, useEffect } from "react";

import NextButton from "../components/NextButton";
import BackButton from "../components/BackButton";
import { AppContext } from "../components/AppManager";
import { UserContext } from "../components/AuthManager";
import firebase from "firebase/app";
import { LecturesEntry } from "../ownTypes";

interface Props {}

const initial = [
  {
    dates: [
      "23-02-20",
      "08-03-20",
      "22-03-20",
      "05-04-20",
      "26-04-20",
      "17-05-20",
      "07-06-20"
    ],
    end_time: "15:10",
    form: "C",
    group: "101",
    lecturer: "Bystrzycka Hanna",
    name: "Rachunkowość",
    signature: "110560-0050",
    start_time: "13:30",
    type: "NLLS"
  },
  {
    dates: ["22-02-20", "07-03-20"],
    end_time: "20:40",
    form: "W",
    group: "10",
    lecturer: "Bystrzycka Hanna",
    name: "Rachunkowość",
    signature: "110560-0050",
    start_time: "19:00",
    type: "NLLS"
  },
  {
    dates: ["05-04-20"],
    end_time: "19:45",
    form: "W",
    group: "10",
    lecturer: "Bystrzycka Hanna",
    name: "Rachunkowość",
    signature: "110560-0050",
    start_time: "17:10",
    type: "NLLS"
  },
  {
    dates: [
      "22-02-20",
      "07-03-20",
      "21-03-20",
      "04-04-20",
      "25-04-20",
      "16-05-20",
      "06-06-20"
    ],
    end_time: "13:20",
    form: "W",
    group: "10",
    lecturer: "Baranowska-Prokop Ewa",
    name: "Marketing globalny",
    signature: "121450-0014",
    start_time: "11:40",
    type: "NLLS"
  }
];

const FetchLectures: React.FC<Props> = () => {
  const [lectures, setLectures] = useState<LecturesEntry[]>(initial);
  const [loading, setLoading] = useState(false);

  const {
    data: { inputLectures, type }
  } = useContext(AppContext);

  // useEffect(() => {
  //   const updateLectures = () => {
  //     return Promise.all(
  //       inputLectures.map(async ({ signature, group }) => {
  //         try {
  //           const snapshot = await firebase
  //             .firestore()
  //             .collection("lectures")
  //             .where("signature", "==", signature)
  //             .where("type", "==", type)
  //             .where("group", "==", group)
  //             .get();

  //           const newLectures = snapshot.docs.map(doc =>
  //             doc.data()
  //           ) as LecturesEntry[];
  //           setLectures(prev => [...prev, ...newLectures]);
  //         } catch (err) {
  //           console.log("error fetching lectures", err);
  //         }
  //       })
  //     );
  //   };

  //   updateLectures().then(() => {
  //     setLoading(false);
  //   });
  // }, []);

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
        scroll={{ x: true }}
        className="lectures-table"
        columns={[
          {
            title: "Sygnatura",
            dataIndex: "signature",
            key: "signature"
          },
          { title: "Przedmiot", dataIndex: "name", key: "name" },
          { title: "Grupa", dataIndex: "group", key: "group" },
          { title: "Forma", dataIndex: "form", key: "form" },
          {
            title: "Wykładowca",
            dataIndex: "lecturer",
            key: "lecturer"
          }
        ]}
        expandedRowRender={item => (
          <Table
            size="small"
            pagination={false}
            dataSource={item.dates.map(date => ({
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
