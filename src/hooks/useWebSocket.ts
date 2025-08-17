"use client";

import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/context/AuthContext";

interface WebSocketMessage {
  type: string;
  data: unknown;
}

interface UseWebSocketReturn {
  sendMessage: (message: unknown) => void;
  isConnected: boolean;
  lastMessage: WebSocketMessage | null;
}

export function useWebSocket(chatId?: string): UseWebSocketReturn {
  const [isConnected, setIsConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState<WebSocketMessage | null>(null);
  const ws = useRef<WebSocket | null>(null);
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated || !user || !chatId) return;

    const token = localStorage.getItem("token");
    if (!token) return;

    // WebSocket URL - using secure WebSocket with domain
    const wsUrl = `wss://api.pokee.in/ws?token=${encodeURIComponent(token)}&chat_id=${chatId}`;

    try {
      ws.current = new WebSocket(wsUrl);

      ws.current.onopen = () => {
        console.log("WebSocket connected");
        setIsConnected(true);
      };

      ws.current.onmessage = (event) => {
        try {
          const message: WebSocketMessage = JSON.parse(event.data);
          setLastMessage(message);
        } catch (error) {
          console.error("Failed to parse WebSocket message:", error);
        }
      };

      ws.current.onclose = () => {
        console.log("WebSocket disconnected");
        setIsConnected(false);
      };

      ws.current.onerror = (error) => {
        console.error("WebSocket error:", error);
        setIsConnected(false);
      };
    } catch (error) {
      console.error("Failed to create WebSocket connection:", error);
    }

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [chatId, isAuthenticated, user]);

  const sendMessage = (message: unknown) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(message));
    } else {
      console.warn("WebSocket is not connected");
    }
  };

  return {
    sendMessage,
    isConnected,
    lastMessage,
  };
}
