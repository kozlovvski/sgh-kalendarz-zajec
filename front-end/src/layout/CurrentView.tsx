import React, { useContext } from "react";
import { ViewContext } from "../components/ViewManager";
import Index from "../views/Index";
import AddSignatures from "../views/AddSignatures";

interface Props {}

const Views = [<Index />, <AddSignatures />];

const CurrentView: React.FC<Props> = () => {
  const { view } = useContext(ViewContext);
  return Views[view];
};

export default CurrentView;
