import React, { createContext, useContext, useEffect, useState } from "react";
import { WEBSOCKET_URL } from "@env";

const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [websocketTraps, setWebsocketTraps] = useState([]);
  const [isPlacingTrapTurn, setIsPlacingTrapTurn] = useState(false);
  const [level, setLevel] = useState(1);
  const [canNavigate, setCanNavigate] = useState(false);
  useEffect(() => {
    const socketInstance = new WebSocket(WEBSOCKET_URL);

    socketInstance.onopen = () => {
      console.log("Connexion WebSocket ouverte.");
    };
    socketInstance.onmessage = (message) => {
      const data = JSON.parse(message.data);
      console.log("Message reçu:", data);
      switch (data.type) {
        case "placeTrap":
          console.log("Place trap", data.trap);
          setWebsocketTraps((traps) => [...traps, data]);
          break;
        case "gameState":
          if (data.state == "unityplaying") {
            setIsPlacingTrapTurn(false);
          } else if (data.state == "placingtrapturn") {
            setCanNavigate(true);
            setIsPlacingTrapTurn(true);
          }
          break;
        case "level":
          setLevel(data.level);
          break;
        default:
          break;
      }
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
      console.log("Le WebSocket n'est pas ouvert.");
    }
  };

  return (
    <WebSocketContext.Provider
      value={{
        socket,
        sendMessage,
        websocketTraps,
        setWebsocketTraps,
        isPlacingTrapTurn,
        setIsPlacingTrapTurn,
        level,
        canNavigate,
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  return useContext(WebSocketContext);
};
