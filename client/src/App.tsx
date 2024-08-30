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
  const [messages, setMessages] = useState<Message[]>([]);
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [username, setUsername] = useState<string>('');
  const [port, setPort] = useState<string>('');
  
  const filteredMessages = messages.filter((message) => message.sender !== username);

  useEffect(() => {
    if (username && port) {
      const socket = new WebSocket(`ws://localhost:${port}`);
      socket.onopen = () => {
        setWs(socket);
        socket.send(JSON.stringify({ sender: username, content: '' }));
      };

      socket.onmessage = (event) => {
        const message: Message = JSON.parse(event.data);
        if (message.sender !== username) {
          setMessages((prevMessages) => [...prevMessages, message]);
        }
      };

      return () => {
        socket.close();
      };
    }
  }, [username, port]);

  const handleSendMessage = (message: string) => {
    if (ws && username) {
      const messageObject = { sender: username, content: message };
      ws.send(JSON.stringify(messageObject));
      setMessages((prevMessages) => [...prevMessages, messageObject]);
    }
  };

  const handleSetCredentials = (username: string, port: string) => {
    setUsername(username);
    setPort(port);
  };

  if (!username || !port) {
    return <div className={styles.appContainer}><LoginPrompt onSetCredentials={handleSetCredentials} /></div>;
  }

  return (
    <div className={styles.appContainer}>
      <h1 className={styles.title}>Group Chat</h1>
      <ChatWindow messages={filteredMessages} />
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
}

export default App;
