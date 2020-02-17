import { Typography, Row, Button } from "antd";
import Title from "antd/lib/typography/Title";
import React from "react";

import NextButton from "../components/NextButton";
import BackButton from "../components/BackButton";

interface Props {}

const CopySignatures: React.FC<Props> = () => {
  return (
    <div className="wrapper">
      <Title>2. Skopiuj sygnatury</Title>
      <Typography.Paragraph>
        Skopiuj listę swoich przedmiotów z Wirtualnego Dziekanatu. Po prostu
        zaznacz tabelkę jak zwykły tekst. Upewnij się, czy wszystkie sygnatury i
        numery grup są zaznaczone.
      </Typography.Paragraph>
      <Button
        icon="link"
        href="https://dziekanat.sgh.waw.pl/"
        target="_blank"
        className="wd-button"
      >
        Otwórz Wirtualny Dziekanat
      </Button>
      <img className="gif-image" src="/sygnatury.gif" alt="" />
      <BackButton>Wstecz</BackButton>
      <NextButton type="primary">Dalej</NextButton>
    </div>
  );
};

export default CopySignatures;
