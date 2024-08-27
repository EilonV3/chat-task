import React, { useState, useEffect } from 'react';
import styles from './ChatWindow.module.css';

interface Message {
  sender: string;
  content: string;
}

const ChatWindow: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  
  // Function to add a new message
  const addMessage = (message: Message) => {
    setMessages(prevMessages => [...prevMessages, message]);
  };

  useEffect(() => {
    // Handle socket connection and receiving messages here
  }, []);

  return (
    <div className={styles.chatWindow}>
      {messages.map((message, index) => (
        <div key={index} className={styles.message}>
          <strong>{message.sender}:</strong> {message.content}
        </div>
      ))}
    </div>
  );
};

export default ChatWindow;