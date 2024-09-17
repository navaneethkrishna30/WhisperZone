import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const createRoom = async () => {
    if (!name) {
      setError('Please enter a name');
      return;
    }
    try {
      const res = await axios.post('http://localhost:5000/api/create-room', { name }, { withCredentials: true });
      navigate(`/room/${res.data.room}`);
    } catch (err) {
      setError('Error creating room');
    }
  };

  const joinRoom = async () => {
    if (!name || !code) {
      setError('Please enter a name and room code');
      return;
    }
    try {
      const res = await axios.post('http://localhost:5000/api/join-room', { name, code }, { withCredentials: true });
      navigate(`/room/${res.data.room}`);
    } catch (err) {
      setError('Room does not exist');
    }
  };

  return (
    <div>
      <h3>Enter The Chat Room</h3>
      {error && <p>{error}</p>}
      <input type="text" placeholder="Pick a name!" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="text" placeholder="Room Code" value={code} onChange={(e) => setCode(e.target.value)} />
      <button onClick={joinRoom}>Join a Room</button>
      <button onClick={createRoom}>Create a Room</button>
    </div>
  );
};

export default Home;
