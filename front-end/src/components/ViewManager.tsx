import React, { useState } from "react";

export const ViewContext = React.createContext<{
  view: number;
  changeView: (data: number) => void;
}>({
  view: 0,
  changeView(data: number) {
    console.log("Not loaded yet");
  }
});

export const ViewContextProvider: React.FC = ({ children }) => {
  const [state, setState] = useState<number>(0);

  const changeView = (data: number) => {
    setState(data);
  };

  return (
    <ViewContext.Provider value={{ view: state, changeView }}>
      {children}
    </ViewContext.Provider>
  );
};

export default ViewContextProvider;
