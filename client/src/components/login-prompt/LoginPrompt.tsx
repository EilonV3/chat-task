import React, { useState } from 'react';
import styles from './LoginPrompt.module.css';

function LoginPrompt({ onSetUsername }) {
  const [username, setUsername] = useState('');

  const handleSetUsername = () => {
    if (username.trim()) {
      onSetUsername(username);
    }
  };

  return (
    <div className={styles.promptContainer}>
      <h2 className={styles.promptTitle}>Enter your username</h2>
      <input
        type="text"
        className={styles.usernameInput}
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleSetUsername();
        }}
      />
      <button className={styles.enterButton} onClick={handleSetUsername}>
        Enter
      </button>
    </div>
  );
}

export default LoginPrompt;