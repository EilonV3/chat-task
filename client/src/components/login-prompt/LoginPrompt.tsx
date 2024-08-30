import React, { useState } from 'react';
import styles from './LoginPrompt.module.css';

interface LoginPromptProps {
  onSetCredentials: (username: string, port: string) => void;
}

function LoginPrompt({ onSetCredentials }: LoginPromptProps) {
  const [username, setUsername] = useState<string>('');
  const [port, setPort] = useState<string>('12345');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && port) {
      onSetCredentials(username, port);
    }
  };

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>
      <label>
        Port:
        <input
          type="number"
          value={port}
          onChange={(e) => setPort(e.target.value)}
          required
        />
      </label>
      <button type="submit">Join Chat</button>
    </form>
  );
}

export default LoginPrompt;
