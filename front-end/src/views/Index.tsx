import { Button, Typography, Tooltip } from "antd";
import Title from "antd/lib/typography/Title";
import React, { useContext } from "react";

import { ViewContext } from "../components/ViewManager";
import WelcomeText from "../components/WelcomeText";

interface Props {}

const Index: React.FC<Props> = () => {
  const { changeView } = useContext(ViewContext);

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
      <Button type="primary" onClick={e => changeView(1)}>
        Zaczynamy!
      </Button>
    </div>
  );
};

export default Index;
