import React, { useEffect, useState } from 'react';
import MessageInput from './components/message-input/MessageInput';

import './App.css'; // Assuming you have styles in this file

const App: React.FC = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:3000'); // Ensure this matches your server

    ws.onopen = () => {
      console.log('WebSocket connection established');
      setIsConnected(true);
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
      setIsConnected(false);
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onmessage = (event) => {
      const message = event.data;
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, []);

  const handleSendMessage = (message: string) => {
    if (socket && isConnected) {
      socket.send(message);
    } else {
      console.error('WebSocket is not connected');
    }
  };

  return (
    <div className="app">
      <h1>Chat Application</h1>
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            {msg}
          </div>
        ))}
      </div>
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default App;