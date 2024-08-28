import React from 'react';
import Message from '../message/Message';
import styles from './ChatWindow.module.css';

function ChatWindow({ messages }) {
  return (
    <div className={styles.chatWindow}>
      {messages.map((msg, index) => (
        <Message key={index} sender={msg.sender} content={msg.content} />
      ))}
    </div>
  );
}

export default ChatWindow;