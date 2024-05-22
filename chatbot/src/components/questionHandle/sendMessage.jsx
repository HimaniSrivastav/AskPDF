import { useState } from 'react';
import axios from 'axios';

const MessageInput = ({ fetchMessages }) => {
  const [message, setMessage] = useState('');

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const sendMessage = async () => {
    try {
      await axios.post('http://localhost:8000/messages', { sentence: message });
      setMessage('');
      fetchMessages(); // Fetch messages again after sending a new message
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message.');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={message}
        onChange={handleMessageChange}
        placeholder="Enter your message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default MessageInput;
