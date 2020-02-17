import React, { useContext } from "react";
import Button, { ButtonProps } from "antd/lib/button";
import { AppContext } from "./AppManager";

const NextButton: React.FC<ButtonProps> = props => {
  const {
    data: { view },
    changeData
  } = useContext(AppContext);
  return (
    <Button
      {...props}
      onClick={e => changeData({ view: view + 1 })}
      style={{ ...props.style, marginRight: ".5em" }}
    />
  );
};

export default NextButton;
