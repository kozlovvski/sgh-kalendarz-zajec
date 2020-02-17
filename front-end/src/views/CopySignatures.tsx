import { Typography } from "antd";
import Title from "antd/lib/typography/Title";
import React from "react";

import NextButton from "../components/NextButton";
import BackButton from "../components/BackButton";

interface Props {}

const CopySignatures: React.FC<Props> = () => {
  return (
    <div className="wrapper">
      <Title>1. Skopiuj sygnatury</Title>
      <Typography.Paragraph>
        Skopiuj listę swoich przedmiotów z Wirtualnego Dziekanatu. Możesz na
        przykład zaznaczyć tabelkę i ją skopiować, ale jakakolwiek lista
        zawierająca sygnatury będzie w porządku.
      </Typography.Paragraph>
      <img className="gif-image" src="/sygnatury.gif" alt="" />
      <BackButton>Wstecz</BackButton>
      <NextButton type="primary">Dalej</NextButton>
    </div>
  );
};

export default CopySignatures;
