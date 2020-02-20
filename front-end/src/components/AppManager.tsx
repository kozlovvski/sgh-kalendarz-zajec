import React, { useState, useEffect } from "react";
import { InputLecture, LecturesEntry } from "../ownTypes";

export interface AppData {
  view: number;
  inputLectures: InputLecture[];
  fetchedLectures: LecturesEntry[];
  type: string;
  isLoggingIn: boolean;
}

export interface AppDataInput {
  view?: number;
  inputLectures?: InputLecture[];
  fetchedLectures?: LecturesEntry[];
  type?: string;
  isLoggingIn?: boolean;
}

export const initialAppData = {
  view: 0,
  inputLectures: [],
  fetchedLectures: [],
  type: "",
  isLoggingIn: false
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
  const [isFirstRead, setIsFirstRead] = useState(true);

  const changeData = (data: AppDataInput) => {
    setState(prev => ({ ...prev, ...data }));
  };

  useEffect(() => {
    if (isFirstRead) {
      const storageString = sessionStorage.getItem("app-data");
      storageString && setState(JSON.parse(storageString));
    } else {
      sessionStorage.setItem("app-data", JSON.stringify(state));
    }
    setIsFirstRead(false);
  }, [state]);

  return (
    <AppContext.Provider value={{ data: state, changeData }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
