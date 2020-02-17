import React, { useContext } from "react";
import Button, { ButtonProps } from "antd/lib/button";
import { ViewContext } from "./ViewManager";

const BackButton: React.FC<ButtonProps> = props => {
  const { view, changeView } = useContext(ViewContext);
  return view ? (
    <Button onClick={e => changeView(view - 1)} {...props} />
  ) : null;
};

export default BackButton;
