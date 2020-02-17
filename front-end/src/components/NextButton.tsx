import React, { useContext } from "react";
import Button, { ButtonProps } from "antd/lib/button";
import { ViewContext } from "./ViewManager";

const NextButton: React.FC<ButtonProps> = props => {
  const { view, changeView } = useContext(ViewContext);
  return (
    <Button
      {...props}
      onClick={e => changeView(view + 1)}
      style={{ ...props.style, marginRight: ".5em" }}
    />
  );
};

export default NextButton;
