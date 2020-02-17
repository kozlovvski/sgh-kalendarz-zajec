import React, { useContext } from "react";
import Button, { ButtonProps } from "antd/lib/button";
import { AppContext } from "./AppManager";

const BackButton: React.FC<ButtonProps> = props => {
  const {
    data: { view },
    changeData
  } = useContext(AppContext);
  return view ? (
    <Button
      {...props}
      style={{ ...props.style, marginRight: ".5em" }}
      onClick={e => changeData({ view: view - 1 })}
    />
  ) : null;
};

export default BackButton;
