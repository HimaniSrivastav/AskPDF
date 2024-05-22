import{ useState, useEffect } from 'react';
import axios from 'axios';
import MessageInput from './sendMessage';

const MessageDisplay = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get('http://localhost:8000/messages');
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  return (
    <div>
      <h2>Messages</h2>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message.sentence}</li>
        ))}
      </ul>
      <MessageInput fetchMessages={fetchMessages} />
    </div>
  );
};

export default MessageDisplay;
