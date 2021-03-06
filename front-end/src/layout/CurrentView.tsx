import React, { useContext } from "react";

import { AppContext } from "../components/AppManager";
import AddSignatures from "../views/AddSignatures";
import CopySignatures from "../views/CopySignatures";
import FetchLectures from "../views/FetchLectures";
import Main from "../views/Main";
import PickStudyType from "../views/PickStudyType";
import UploadingLectures from "../views/UploadingLectures";

interface Props {}

const views = [
  <Main />,
  <PickStudyType />,
  <CopySignatures />,
  <AddSignatures />,
  <FetchLectures />,
  <UploadingLectures />
];

const CurrentView: React.FC<Props> = () => {
  const { view } = useContext(AppContext).data;
  return views[view];
};

export default CurrentView;
