import { Button, Typography, Tooltip, Modal } from "antd";
import Title from "antd/lib/typography/Title";
import React, { useContext, useState } from "react";

import { ViewContext } from "../components/ViewManager";
import WelcomeText from "../components/WelcomeText";

interface Props {}

const Index: React.FC<Props> = () => {
  const { changeView } = useContext(ViewContext);
  const [showHowItWorks, setShowHowItWorks] = useState(false);

  return (
    <div className="wrapper">
      <WelcomeText />
      <Typography.Paragraph>
        Ta aplikacja pozwoli Ci w wygodny sposób dodać swoje przedmioty do{" "}
        <a href="https://calendar.google.com/" target="_blank">
          Kalendarza Google
        </a>
        . Skopiuj listę sygnatur z{" "}
        <a href="https://dziekanat.sgh.waw.pl/" target="_blank">
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
      <Button type="primary" onClick={e => changeView(1)}>
        Zaczynamy!
      </Button>
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

export default Index;
