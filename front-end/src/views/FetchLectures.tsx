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

const FetchLectures: React.FC<Props> = () => {
  const [lectures, setLectures] = useState<LecturesEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const {
    data: { inputLectures }
  } = useContext(AppContext);

  useEffect(() => {
    const updateLectures = () => {
      return Promise.all(
        inputLectures.map(async signature => {
          try {
            const snapshot = await firebase
              .firestore()
              .collection("lectures")
              .where("signature", "==", signature)
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
  }, []);

  return (
    <div className="wrapper">
      <Title>4. Pobierz przedmioty</Title>
      {loading && (
        <Typography.Paragraph>Pobieranie danych</Typography.Paragraph>
      )}
      <Table
        dataSource={lectures}
        columns={[
          { title: "Sygnatura", dataIndex: "signature", key: "signature" },
          { title: "Przedmiot", dataIndex: "name", key: "name" },
          { title: "Forma", dataIndex: "form", key: "form" },
          { title: "Wykładowca", dataIndex: "lecturer", key: "lecturer" }
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
