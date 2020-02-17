import React, { useState } from "react";
import { InputLecture } from "../ownTypes";

export interface AppData {
  view: number;
  inputLectures: InputLecture[];
}

export interface AppDataInput {
  view?: number;
  inputLectures?: InputLecture[];
}

export const initialAppData = {
  view: 2,
  inputLectures: []
};

export const AppContext = React.createContext<{
  data: AppData;
  changeData: (data: AppDataInput) => void;
}>({
  data: initialAppData,
  changeData(data: AppDataInput) {
    console.log("Not loaded yet");
  }
});

export const AppContextProvider: React.FC = ({ children }) => {
  const [state, setState] = useState<AppData>(initialAppData);

  const changeData = (data: AppDataInput) => {
    setState(prev => ({ ...prev, ...data }));
  };

  return (
    <AppContext.Provider value={{ data: state, changeData }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
