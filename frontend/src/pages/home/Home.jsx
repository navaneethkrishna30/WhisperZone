import { useEffect, useRef, useState } from "react";
import { FaCircleExclamation } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Header from "../../components/header/Header";
import Button from "../../components/button/Button";

import "./style.css";

const Home = () => {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const errMessageRef = useRef();
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.removeItem("name");
  }, []),
    useEffect(() => {
      if (error === "") {
        errMessageRef.current.style.opacity = 0;
      } else {
        errMessageRef.current.style.opacity = 1;
      }
    }, [error]);

  const createRoom = async () => {
    setError("");
    if (!name) {
      setError("Please enter a name");
      return;
    }
    try {
      const res = await axios.post(
        "http://localhost:5000/api/create-room",
        { name },
        { withCredentials: true }
      );
      localStorage.setItem("name", name);
      navigate(`/room/${res.data.room}`);
    } catch (err) {
      setError("Error creating room", err);
    }
  };

  const joinRoom = async () => {
    setError("");
    if (!name || !code) {
      setError("Please enter a name and room code");
      return;
    }
    try {
      const res = await axios.post(
        "http://localhost:5000/api/join-room",
        { name, code },
        { withCredentials: true }
      );
      localStorage.setItem("name", name);
      navigate(`/room/${res.data.room}`);
    } catch (err) {
      setError("Room does not exist", err);
    }
  };

  return (
    <>
      <main className="home">
        <Header />
        <article className="home">
          <div className="user-form">
            <h3>Enter The Chat Room</h3>
            <input
              type="text"
              placeholder="Pick a name!"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error != "") {
                  setError("");
                }
              }}
            />
            <input
              type="text"
              placeholder="Room Code"
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                if (error != "") {
                  setError("");
                }
              }}
            />
            <div className="err-message" ref={errMessageRef}>
              {/* <img src="/iconpack/error.svg" draggable="false" /> */}
              <FaCircleExclamation className="icons err-icon" />
              <p>{error}</p>
            </div>
            <div className="voidspace"></div>
            <Button label="Join Room" onClick={joinRoom} />
            <Button label="Create Room" onClick={createRoom} />
          </div>
        </article>
      </main>
    </>
  );
};

export default Home;
