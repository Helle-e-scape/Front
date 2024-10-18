import React, { createContext, useContext, useEffect, useState } from "react";

const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const socketInstance = new WebSocket("ws://10.49.32.240:8080");

    socketInstance.onopen = () => {
      console.log("Connexion WebSocket ouverte.");
    };
    socketInstance.onmessage = (message) => {
      const data = JSON.parse(message.data);
      console.log("Message reçu:", data);
    };

    setSocket(socketInstance);

    return () => {
      if (socketInstance) {
        socketInstance.close();
      }
    };
  }, []);

  const sendMessage = (message) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(message));
    } else {
      console.error("Le WebSocket n'est pas ouvert.");
    }
  };

  return (
    <WebSocketContext.Provider value={(socket, sendMessage)}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  return useContext(WebSocketContext);
};
