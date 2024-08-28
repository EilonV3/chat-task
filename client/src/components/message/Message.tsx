import React from 'react';
import styles from './Message.module.css';

function Message({ sender, content }) {
  return (
    <div className={styles.message}>
      <strong className={styles.sender}>{sender}:</strong> {content}
    </div>
  );
}

export default Message;
