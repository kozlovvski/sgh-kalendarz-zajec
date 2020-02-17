import { Typography, Input, Tag } from "antd";
import Title from "antd/lib/typography/Title";
import React, { useState, ChangeEvent } from "react";

import NextButton from "../components/NextButton";
import BackButton from "../components/BackButton";

interface Props {}

const AddSignatures: React.FC<Props> = () => {
  const [signatures, setSignatures] = useState<string[]>([]);

  const handleExtractSignatures = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const matches = value.match(/\d{6}-\d{4}/g);
    const withoutDuplicates = [...new Set(matches)];

    setSignatures(withoutDuplicates || []);
  };

  return (
    <div className="wrapper">
      <Title>2. Wklej sygnatury</Title>
      <Typography.Paragraph>
        Wklej poniżej skopiowane dane i sprawdź czy wszystko się zgadza.
        Aplikacja powinna znaleźć wszystkie sygnatury o postaci "xxxxxx-xxxx",
        np. "123456-7890"
      </Typography.Paragraph>
      <Input style={{ margin: "1em 0" }} onChange={handleExtractSignatures} />
      {signatures.length !== 0 && (
        <div style={{ margin: "1em 0" }}>
          <Typography.Title level={4}>Znalezione sygnatury:</Typography.Title>
          {signatures.map(item => (
            <Tag>{item}</Tag>
          ))}
        </div>
      )}
      <BackButton>Wstecz</BackButton>
      <NextButton type="primary">Dalej</NextButton>
    </div>
  );
};

export default AddSignatures;
