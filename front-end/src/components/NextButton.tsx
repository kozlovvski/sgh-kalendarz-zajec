import React, { useContext } from "react";
import Button, { ButtonProps } from "antd/lib/button";
import { ViewContext } from "./ViewManager";

const NextButton: React.FC<ButtonProps> = props => {
  const { view, changeView } = useContext(ViewContext);
  return <Button onClick={e => changeView(view + 1)} {...props} />;
};

export default NextButton;
