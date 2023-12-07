import React, { createContext, useMemo } from 'react';
import { io } from 'socket.io-client';

const socketContext = createContext(null);

export const useSocket = () => {
  return React.useContext(socketContext);
};

export const SocketProvider = (props) => {
  const socket = useMemo(() => io('http://localhost:8080'), []);

  return (
    <socketContext.Provider value={{ socket }}>
      {props.children}
    </socketContext.Provider>
  );
};
