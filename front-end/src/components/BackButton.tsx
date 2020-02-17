import React, { useContext } from "react";
import Button, { ButtonProps } from "antd/lib/button";
import { ViewContext } from "./ViewManager";

const BackButton: React.FC<ButtonProps> = props => {
  const { view, changeView } = useContext(ViewContext);
  return view ? (
    <Button
      {...props}
      style={{ ...props.style, marginRight: ".5em" }}
      onClick={e => changeView(view - 1)}
    />
  ) : null;
};

export default BackButton;
