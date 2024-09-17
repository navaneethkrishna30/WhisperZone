import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';

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
        setMembers(data.members); // This should update the members state correctly
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

  return (
    <div>
      <h2>Chat Room: {roomId}</h2>
      <div id="members">
        <h3>Members</h3>
        <ul>
          {members.map((member, index) => (
            <li key={index}>{member}</li>
          ))}
        </ul>
      </div>
      <div id="messages">
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.name}</strong>: {msg.message}
          </div>
        ))}
      </div>
      <input
        type="text"
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
      <button onClick={handleLeaveRoom}>Leave Room</button>
    </div>
  );
};

export default ChatRoom;
