import React from "react";
import {CexWs} from "src/socket";

const CexWsContext = React.createContext(null);

export const useCexWs = () => React.useContext<CexWs>(CexWsContext);

export const useSocket = () => useCexWs().socket;

const CexWsProvider: React.FC<{value: CexWs}> = (props) => {
  return (
    <CexWsContext.Provider value={props.value}>
      {props.children}
    </CexWsContext.Provider>
  );
};

export default CexWsProvider;
