import React, { useState } from "react";
import { Tooltip, Typography, Icon } from "antd";

interface Props {}

const randomWelcomeText = () => {
  const welcomeTexts = [
    "Hej!",
    "Serwus!",
    "Siemanko!",
    "Hejka!",
    "Halko!",
    "Witaj!",
    "Siemka!",
    "Dzień dobry!"
  ];

  const randomIndex = Math.floor(Math.random() * welcomeTexts.length);

  return welcomeTexts[randomIndex];
};

const WelcomeText: React.FC<Props> = () => {
  const [text, setText] = useState(randomWelcomeText());

  const setNewText = () => {
    let newText = randomWelcomeText();

    while (text === newText) {
      newText = randomWelcomeText();
    }

    setText(newText);
  };

  return (
    <Typography.Title>
      <span className="welcome-text" onClick={e => setNewText()}>
        {text}
      </span>
      <Tooltip
        placement="right"
        title={
          <span className="welcome-text__tooltip">
            "Psst... Nie podoba Ci się przywitanie? Kliknij na nie, by je
            zmienić!
          </span>
        }
      >
        <Icon type="info-circle" className="welcome-text__icon" />
      </Tooltip>
    </Typography.Title>
  );
};

export default WelcomeText;
