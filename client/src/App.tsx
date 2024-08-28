import React, { useState, useEffect } from 'react';
import ChatWindow from './components/chat-window/ChatWindow';
import LoginPrompt from './components/login-prompt/LoginPrompt';
import MessageInput from './components/message-input/MessageInput';
import styles from './App.module.css';

interface Message {
  sender: string;
  content: string;
}

function App() {
  const [messages, setMessages] = useState([]);
  const [ws, setWs] = useState(null);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    if (username) {
      const socket = new WebSocket('ws://localhost:12345');
      socket.onopen = () => {
        setWs(socket);
        socket.send(JSON.stringify({ sender: username, content: '' }));
      };

      socket.onmessage = (event) => {
        const message = JSON.parse(event.data);
        if (message.sender !== username) {
          setMessages((prevMessages) => [...prevMessages, message]);
        }
      };

      return () => {
        socket.close();
      };
    }
  }, [username]);

  const handleSendMessage = (message) => {
    if (ws && username) {
      const messageObject = { sender: username, content: message };
      ws.send(JSON.stringify(messageObject));
      setMessages((prevMessages) => [...prevMessages, messageObject]);
    }
  };

  if (!username) {
    return <LoginPrompt onSetUsername={setUsername} />;
  }

  return (
    <div className={styles.appContainer}>
      <h1 className={styles.title}>Group Chat</h1>
      <ChatWindow messages={messages} />
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
}

export default App;