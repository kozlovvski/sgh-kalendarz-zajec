import React, { useContext } from "react";
import { AppContext } from "../components/AppManager";
import Index from "../views/Index";
import AddSignatures from "../views/AddSignatures";
import CopySignatures from "../views/CopySignatures";
import FetchLectures from "../views/FetchLectures";

interface Props {}

const Views = [
  <Index />,
  <CopySignatures />,
  <AddSignatures />,
  <FetchLectures />
];

const CurrentView: React.FC<Props> = () => {
  const { view } = useContext(AppContext).data;
  return Views[view];
};

export default CurrentView;
