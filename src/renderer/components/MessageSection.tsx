import React, { useState, useEffect } from 'react';

interface Message {
  id: number;
  text: string;
  timestamp: string;
}

const MessageSection: React.FC = () => {
  const [inputMessage, setInputMessage] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    // Listen for messages from main process
    if (window.electronAPI) {
      window.electronAPI.onMessage((message: string) => {
        addMessage(`Received: ${message}`);
      });
    }
  }, []);

  const addMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now(),
      text,
      timestamp: new Date().toLocaleTimeString()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSendMessage = async () => {
    const message = inputMessage.trim();
    if (message && window.electronAPI) {
      try {
        await window.electronAPI.sendMessage(message);
        addMessage(`Sent: ${message}`);
        setInputMessage('');
      } catch (error) {
        addMessage(`Error: ${error}`);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="interaction-section">
      <h2>Test IPC Communication</h2>
      <input
        type="text"
        id="message-input"
        placeholder="Enter a message..."
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button id="send-button" onClick={handleSendMessage}>
        Send Message
      </button>
      <div id="message-output">
        {messages.map((message) => (
          <div key={message.id} className="message">
            {message.timestamp} - {message.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessageSection;