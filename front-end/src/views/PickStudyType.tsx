import { Typography, Input, Tag, Spin, Radio, Button } from "antd";
import Title from "antd/lib/typography/Title";
import React, {
  useState,
  ChangeEvent,
  useContext,
  useEffect,
  MouseEvent
} from "react";

import NextButton from "../components/NextButton";
import BackButton from "../components/BackButton";
import { AppContext } from "../components/AppManager";
import { UserContext } from "../components/AuthManager";
import { InputLecture, Workbook } from "../ownTypes";
import firebase from "firebase/app";
import { RadioChangeEvent } from "antd/lib/radio";

interface Props {}

const PickStudyType: React.FC<Props> = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [workBooks, setWorkbooks] = useState<Workbook[]>([]);
  const {
    data: { view },
    changeData
  } = useContext(AppContext);

  useEffect(() => {
    const fetchWorkbooks = async () => {
      try {
        const snapshot = await firebase
          .firestore()
          .collection("workbooks")
          .get();

        const fetchedWorkbooks = snapshot.docs.map(doc =>
          doc.data()
        ) as Workbook[];

        setWorkbooks(fetchedWorkbooks);
        console.log(fetchedWorkbooks);
      } catch (err) {
        console.log("error fetching lectures", err);
      }
    };

    fetchWorkbooks().then(() => {
      setLoading(false);
    });
  }, []);

  const handleTypeClick = (item: Workbook) => {
    changeData({ view: view + 1, type: item.type! });
  };

  return (
    <div className="wrapper">
      <Title>1. Wybierz tryb</Title>
      <Typography.Paragraph>
        Wybierz swój tryb studiów. Na ten moment dostępne są jedynie wymienione
        tryby - w przyszłości dodamy kolejne.
      </Typography.Paragraph>
      {loading ? (
        <Spin style={{ display: "block", marginBottom: "1em" }} />
      ) : (
        <>
          {workBooks.map(item => {
            const userTimeZone = Intl.DateTimeFormat().resolvedOptions()
              .timeZone;
            return (
              <div key={item.type} style={{ marginBottom: "1em" }}>
                <Button
                  type="primary"
                  value={item.type}
                  onClick={e => {
                    handleTypeClick(item);
                  }}
                  style={{ marginRight: ".5em" }}
                >
                  {item.type}
                </Button>
                Zaktualizowano:{" "}
                <i>
                  {new Date(item.updated_at).toLocaleString("pl-PL", {
                    timeZone: userTimeZone
                  })}
                </i>
              </div>
            );
          })}
        </>
      )}
      <BackButton>Wstecz</BackButton>
    </div>
  );
};

export default PickStudyType;
