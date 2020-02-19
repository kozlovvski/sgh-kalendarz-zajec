import { Button, Modal, Typography } from "antd";
import React, { useState } from "react";

import NextButton from "../components/NextButton";
import WelcomeText from "../components/WelcomeText";

interface Props {}

const Main: React.FC<Props> = () => {
  const [showHowItWorks, setShowHowItWorks] = useState(false);

  return (
    <div className="wrapper">
      <WelcomeText />
      <Typography.Paragraph>
        Ta aplikacja pozwoli Ci w wygodny sposób dodać swoje przedmioty do{" "}
        <a
          href="https://calendar.google.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Kalendarza Google
        </a>
        . Skopiuj listę sygnatur z{" "}
        <a
          href="https://dziekanat.sgh.waw.pl/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Wirtualnego Dziekanatu
        </a>
        , a my zajmiemy się resztą!
      </Typography.Paragraph>
      <Button
        style={{ paddingLeft: 0 }}
        type="link"
        onClick={e => setShowHowItWorks(prev => !prev)}
      >
        Jak to działa?
      </Button>
      <NextButton type="primary">Zaczynamy!</NextButton>
      <Modal
        visible={showHowItWorks}
        title="Jak to działa?"
        okText="Zamknij"
        footer={
          <Button onClick={e => setShowHowItWorks(false)}>Zamknij</Button>
        }
        onCancel={() => setShowHowItWorks(false)}
      >
        <Typography.Paragraph>
          Na podstawie sygnatur wyszukujemy Twoje przedmioty w naszej bazie
          utworzonej z plików harmonogramu ze{" "}
          <a
            href="http://administracja.sgh.waw.pl/pl/DSL/harmonogramy_zajec/Strony/default.aspx"
            target="_blank"
            rel="noopener noreferrer"
          >
            strony Dziekanatu Studium Licencjakiego
          </a>
          . Po znalezieniu zajęć tworzymy w Twoim koncie Google nowy kalendarz
          "SGH - zajęcia" i dodajemy do niego odpowiednie wydarzenia. I gotowe!
        </Typography.Paragraph>
      </Modal>
    </div>
  );
};

export default Main;
