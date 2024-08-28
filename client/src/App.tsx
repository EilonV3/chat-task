import React, { useState, useEffect } from 'react';
import MessageInput from './components/message-input/MessageInput';

interface Message {
  sender: string;
  content: string;
}

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    if (username) {
      const socket = new WebSocket('ws://localhost:12345');
      socket.onopen = () => {
        console.log('Connected to server');
        setWs(socket);
        // Send username to the server
        socket.send(JSON.stringify({ sender: username, content: '' }));
      };

      socket.onmessage = (event) => {
        const message = JSON.parse(event.data);
        console.log('Received message:', message);
        if (message.sender !== username) {
          setMessages((prevMessages) => [...prevMessages, message]);
        }
      };

      socket.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      return () => {
        socket.close();
      };
    }
  }, [username]);

  const handleSendMessage = (message: string) => {
    if (ws && username) {
      const messageObject = { sender: username, content: message };
      ws.send(JSON.stringify(messageObject));
      setMessages((prevMessages) => [...prevMessages, messageObject]);
    }
  };

  if (!username) {
    return (
      <div>
        <h1>Enter your username</h1>
        <input
          type="text"
          placeholder="Username"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setUsername(e.currentTarget.value);
            }
          }}
        />
      </div>
    );
  }

  return (
    <div>
      <h1>Group Chat</h1>
      <div id="chat">
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.sender}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
}

export default App;
