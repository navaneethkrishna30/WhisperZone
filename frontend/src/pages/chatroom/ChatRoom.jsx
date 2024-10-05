import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import { IoSend } from "react-icons/io5";
import { FaUserGroup } from "react-icons/fa6";

import { toast } from "react-toastify"; // Add this import for toast notifications

import Header from "../../components/header/Header";
import Button from "../../components/button/Button";

import { io } from "socket.io-client";
import axios from "axios";

import "./style.css";

const ChatRoom = () => {
  const membersectionref = useRef();
  const chatboxsectionref = useRef();
  const [winWidth, setWinWidth] = useState(window.innerWidth);
  const articleref = useRef();
  const { roomId } = useParams();
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [members, setMembers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setWinWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (winWidth < 769) {
      membersectionref.current.style.width = "100svw";
      membersectionref.current.style.left = "-100svw";
      chatboxsectionref.current.style.width = "100svw";
      chatboxsectionref.current.style.left = "0";
    } else {
      membersectionref.current.style.width = "360px";
      membersectionref.current.style.left = "0";
      chatboxsectionref.current.style.width = "calc(100svw - 360px)";
      chatboxsectionref.current.style.left = "360px";
    }
  }, [winWidth]);

  useEffect(() => {
    if (localStorage.getItem("name") == null) {
      navigate("/");
    }
    const newSocket = io("http://localhost:5000", { withCredentials: true });
    setSocket(newSocket);

    newSocket.on("connect", () => {
      newSocket.emit("join-room", { roomId });
    });

    newSocket.on("message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    newSocket.on("members", (data) => {
      setMembers(data.members);
    });

    newSocket.on("previous-messages", (data) => {
      setMessages(data.messages);
    });

    return () => newSocket.disconnect();
  }, [roomId]);

  const sendMessage = () => {
    if (message.trim() !== "" && socket) {
      socket.emit("message", { data: message });
      setMessage("");
    }
  };

  const handleLeaveRoom = () => {
    navigate("/");
  };

  const saveChat = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/save-chat", {
        room: roomId,
        messages: messages,
      });
      toast.success(res.data.message); // Use toast for success notification
    } catch (err) {
      console.error(err.response.data);
      toast.error(
        "Error saving chat: " + (err.response.data.error || "Unknown error")
      ); // Use toast for error notification
    }
  };
  return (
    <>
      <main className="chatroom">
        <Header />
        <article className="chatroom" ref={articleref}>
          <div
            className="members-section has-custom-scrollbar"
            ref={membersectionref}
          >
            <div
              className="closesidebar"
              onClick={() => {
                membersectionref.current.style.left = "-100svw";
                chatboxsectionref.current.style.left = "0";
              }}
            >
              <FaArrowLeft className="icons" />
            </div>
            <div className="members-title">
              <h4>Members</h4>
              <div className="count">
                {members.length == 0 ? 1 : members.length}
              </div>
              <div className="voidspace"></div>
              <div className="room-code">
                <p>Room Code</p>
                <span>{roomId}</span>
              </div>
            </div>
            <div className="memberlist has-custom-scrollbar">
              <p>
                {localStorage.getItem("name")}
                <span className="youtag">You</span>
              </p>
              {members.map((member, index) =>
                member == localStorage.getItem("name") ? null : (
                  <p key={index}>{member}</p>
                )
              )}
            </div>
            <div className="others">
              <Button label="Save Chat" onClick={saveChat} />
              <Button label="Leave Room" onClick={handleLeaveRoom} />
            </div>
          </div>
          <div className="chatbox-section" ref={chatboxsectionref}>
            <div className="message-list has-custom-scrollbar">
              {messages.map((msg, index) =>
                msg.name == localStorage.getItem("name") ? (
                  <div className="message own" key={index}>
                    <h5>{msg.name}</h5>
                    <p>{msg.message}</p>
                  </div>
                ) : (
                  <div className="message" key={index}>
                    <h5>{msg.name}</h5>
                    <p>{msg.message}</p>
                  </div>
                )
              )}
            </div>
            <div className="user-chat-options">
              <div
                className="opensidebar"
                onClick={() => {
                  membersectionref.current.style.left = "0";
                  chatboxsectionref.current.style.left = "100svw";
                }}
              >
                <FaUserGroup />
              </div>
              <input
                type="text"
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <div className="send-button" onClick={sendMessage}>
                <IoSend />
              </div>
            </div>
          </div>
        </article>
      </main>
    </>
  );
};

export default ChatRoom;
