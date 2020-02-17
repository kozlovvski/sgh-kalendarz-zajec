import { Typography, Input, Tag, Table } from "antd";
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
    dates: "23-02-20;08-03-20;22-03-20;05-04-20;26-04-20;17-05-20;07-06-20;",
    end_time: "15:10",
    form: "ćwiczenia",
    group: "101",
    lecturer: "Bystrzycka Hanna",
    name: "Rachunkowość",
    signature: "110560-0050",
    start_time: "13:30",
    type: "NLLS"
  },
  {
    dates: "22-02-20;07-03-20;",
    end_time: "20:40",
    form: "Wykład",
    group: "10",
    lecturer: "Bystrzycka Hanna",
    name: "Rachunkowość",
    signature: "110560-0050",
    start_time: "19:00",
    type: "NLLS"
  },
  {
    dates: "05-04-20;",
    end_time: "19:45",
    form: "Wykład",
    group: "10",
    lecturer: "Bystrzycka Hanna",
    name: "Rachunkowość",
    signature: "110560-0050",
    start_time: "17:10",
    type: "NLLS"
  },
  {
    dates: "22-02-20;07-03-20;21-03-20;04-04-20;25-04-20;16-05-20;06-06-20;",
    end_time: "13:20",
    form: "Wykład",
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
      <Title>4. Pobierz przedmioty</Title>
      <Table
        dataSource={lectures}
        loading={loading}
        scroll={{ x: true }}
        size="small"
        columns={[
          {
            title: "Sygnatura",
            dataIndex: "signature",
            key: "signature",
            fixed: "left"
          },
          { title: "Przedmiot", dataIndex: "name", key: "name", fixed: "left" },
          { title: "Forma", dataIndex: "form", key: "form" },
          { title: "Wykładowca", dataIndex: "lecturer", key: "lecturer" },
          {
            title: "Godzina rozpoczęcia",
            dataIndex: "start_time",
            key: "start_time"
          },
          {
            title: "Godzina zakończenia",
            dataIndex: "end_time",
            key: "end_time"
          },
          { title: "Daty", dataIndex: "dates", key: "dates" }
        ]}
      />
      <BackButton>Wstecz</BackButton>
      <NextButton type="primary" disabled={loading}>
        Dalej
      </NextButton>
    </div>
  );
};

export default FetchLectures;
