import React from 'react';
import styles from './Message.module.css';

function Message({ sender, content }) {
  return (
    <div className={styles.message}>
      {sender ? (
        <>
          <strong className={styles.sender}>{sender}:</strong> {content}
        </>
      ) : <>{content}</>}
    </div>
  );
}

export default Message;
