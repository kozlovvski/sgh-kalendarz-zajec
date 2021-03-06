import { Typography, Input, Tag, Button } from "antd";
import Title from "antd/lib/typography/Title";
import React, { useState, ChangeEvent, useContext } from "react";

import NextButton from "../components/NextButton";
import BackButton from "../components/BackButton";
import { AppContext } from "../components/AppManager";
import { UserContext } from "../components/AuthManager";
import { InputLecture } from "../ownTypes";

interface Props {}

const AddSignatures: React.FC<Props> = () => {
  const {
    data: { inputLectures: contextInputLectures },
    changeData
  } = useContext(AppContext);

  const [inputLectures, setInputLectures] = useState<InputLecture[]>(
    contextInputLectures
  );
  const { user } = useContext(UserContext);

  const handleExtractSignatures = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;

    const lines = value.split(/\n/);
    const matches = lines.reduce<InputLecture[]>((arr, curr) => {
      // cannot use loohbehinds in regex - must split string and then search in parts
      const parts = curr.split(/\t/);
      const signatureMatches: RegExpMatchArray | string | null = curr.match(
        /\d{6}-\d{4}/g
      );
      const group = parts.find(part => /^[1-9]\d{0,2}[A-Za-z]?$/.test(part));

      return !signatureMatches || !group || signatureMatches.length !== 1
        ? arr
        : [...arr, { signature: signatureMatches[0], group }];
    }, []);

    setInputLectures(matches);

    // strip unnecessary letters from lecture group - they don't exist in our database
    changeData({
      inputLectures: matches.map(item => ({
        ...item,
        group: item.group.replace(/[A-Za-z]+/g, "")
      }))
    });
  };

  return (
    <div className="wrapper">
      <Title>3. Wklej sygnatury</Title>
      <Typography.Paragraph>
        Wklej poniżej skopiowane dane i sprawdź czy wszystko się zgadza.
        Aplikacja wyświetli wszystkie znalezione sygnatury i numery grup.
      </Typography.Paragraph>
      {inputLectures.length === 0 && (
        <Input.TextArea
          placeholder="Wklej dane tutaj"
          className="lectures-input"
          onChange={handleExtractSignatures}
          rows={1}
        />
      )}
      {inputLectures.length !== 0 && (
        <>
          <Button onClick={e => setInputLectures([])}>
            Wyczyść wyszukiwanie
          </Button>
          <div style={{ margin: "1em 0" }}>
            <Typography.Title level={4}>
              Znalezione przedmioty:
            </Typography.Title>
            {inputLectures.map(item => (
              <Tag>
                <b>Sygnatura: </b>
                {item.signature} <b>Grupa: </b>
                {item.group}
              </Tag>
            ))}
          </div>
        </>
      )}
      <BackButton>Wstecz</BackButton>
      {user ? (
        <NextButton type="primary" disabled={!inputLectures.length}>
          Dalej
        </NextButton>
      ) : (
        "Aby przejść dalej musisz się zalogować"
      )}
    </div>
  );
};

export default AddSignatures;
