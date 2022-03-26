import React, {useEffect} from "react";
import {io, Socket} from "socket.io-client";

const SocketContext = React.createContext<Socket>(null);

export const useSocket = () => React.useContext(SocketContext);

export const SocketProvider: React.FC = (props) => {
  const [socket, setSocket] = React.useState<Socket>(null);

  useEffect(() => {
    if (!socket) {
      const newSocket = io("http://localhost:3000", {
        reconnection: true,
        reconnectionAttempts: 10,
      });
      setSocket(newSocket);
    }
  }, [socket]);

  return (
    <SocketContext.Provider value={socket}>
      {props.children}
    </SocketContext.Provider>
  );
};
