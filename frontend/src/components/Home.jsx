import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify'; // Add this import for toast notifications

const Home = () => {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const navigate = useNavigate();

  const createRoom = async () => {
    if (!name) {
      toast.error('Please enter a name'); // Use toast for error notification
      return;
    }
    try {
      const res = await axios.post('http://localhost:5000/api/create-room', { name }, { withCredentials: true });
      navigate(`/room/${res.data.room}`);
    } catch (err) {
      toast.error('Error creating room: ' + (err.response.data.error || 'Unknown error')); // Use toast for error notification
    }
  };

  const joinRoom = async () => {
    if (!name || !code) {
      toast.error('Please enter a name and room code'); // Use toast for error notification
      return;
    }
    try {
      const res = await axios.post('http://localhost:5000/api/join-room', { name, code }, { withCredentials: true });
      navigate(`/room/${res.data.room}`);
    } catch (err) {
      toast.error('Room does not exist: ' + (err.response.data.error || 'Unknown error')); // Use toast for error notification
    }
  };

  return (
    <div id="home-container">
      <h3>Enter The Chat Room</h3>
      <input type="text" placeholder="Pick a name!" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="text" placeholder="Room Code" value={code} onChange={(e) => setCode(e.target.value)} />
      <button onClick={joinRoom}>Join a Room</button>
      <button onClick={createRoom}>Create a Room</button>
    </div>
  );
};

export default Home;
