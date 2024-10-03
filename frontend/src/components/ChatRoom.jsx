import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import axios from 'axios';
import { toast } from 'react-toastify'; // Add this import for toast notifications

const ChatRoom = () => {
  const { roomId } = useParams();
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [members, setMembers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const newSocket = io('http://localhost:5000', { withCredentials: true });
    setSocket(newSocket);

    newSocket.on('connect', () => {
        newSocket.emit('join-room', { roomId });
    });

    newSocket.on('message', (data) => {
        setMessages((prev) => [...prev, data]);
    });

    newSocket.on('members', (data) => {
        setMembers(data.members);
    });

    newSocket.on('previous-messages', (data) => {
        setMessages(data.messages);
    });

    return () => newSocket.disconnect();
}, [roomId]);


  const sendMessage = () => {
    if (message.trim() !== '' && socket) {
      socket.emit('message', { data: message });
      setMessage('');
    }
  };

  const handleLeaveRoom = () => {
    navigate('/');
  };

  const saveChat = async () => {
    try {
        const res = await axios.post('http://localhost:5000/api/save-chat', {
            room: roomId,
            messages: messages,
        });
        toast.success(res.data.message); // Use toast for success notification
    } catch (err) {
        console.error(err.response.data);
        toast.error('Error saving chat: ' + (err.response.data.error || 'Unknown error')); // Use toast for error notification
    }
  };

  return (
    <div>
      <div className="navbar">
        <a href="/" className="brand">LiveChat</a>
        <div className="room-code">Room Code: {roomId}</div>
      </div>
      
      <div id="chat-container">
        <div id="sidebar">
          <h3>Members</h3>
          <div id="members">
            <ul>
              {members.map((member, index) => (
                <li key={index}>{member}</li>
              ))}
            </ul>
          </div>
          <button onClick={saveChat}>Save Chat</button>
          <button onClick={handleLeaveRoom}>Leave Room</button>
        </div>
  
        <div id="messages-container">
          <div id="messages">
            {messages.map((msg, index) => (
              <div key={index}>
                <strong>{msg.name}</strong>: {msg.message}
              </div>
            ))}
          </div>
          <div id="input-container">
            <input
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
   
};

export default ChatRoom;
