import React, { useState, useEffect } from "react";

// Import Files
import axios from "./axios";
import Logout from "./Logout";
import ChatInput from "./ChatInput";
import Messages from "./Messages";
import Loader from "../components/Loader";

const ChatContainer = ({ currentUser, currentChat }) => {
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);

  const config = {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  };

  useEffect(() => {
    setLoading(true);
    const fetchMessages = async () => {
      const { data } = await axios.post(
        "/api/messages/getMsg",
        {
          from: currentUser._id,
          to: currentChat._id,
        },
        config
      );
      if (data) {
        setLoading(false);
        setMessages(data);
      }
    };

    fetchMessages();
  }, [currentChat]);

  const handleSendMsg = async (msg) => {
    await axios.post(
      "/api/messages/addMsg",
      { from: currentUser._id, to: currentChat._id, message: msg },
      config
    );
  };
  return (
    <>
      {currentChat && (
        <div className="chat_container_component w-full text-white grid grid-rows-[15%,75%,10%] h-[85vh] ">
          <div className="chat-header bg-[#ffffff39] p-[1rem] flex justify-between items-center ">
            <div className="user-details flex gap-4 items-center ">
              <div className="avatar">
                <img
                  className="h-[3rem]"
                  src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
                  alt="avatar"
                />
              </div>
              <div className="username">
                <h3 className="text-xl font-bold">{currentChat.username}</h3>
              </div>
            </div>
            <div className="logout">
              <Logout />
            </div>
          </div>

          {loading ? (
            <Loader />
          ) : (
            <div className="chat-messages scroll-bar text-white flex flex-col gap-[1rem] overflow-auto px-[1rem] py-[2rem]">
              {messages &&
                messages.map((message, index) => (
                  <div
                    className={`messages flex items-center ${
                      message.fromSelf ? "justify-end" : ""
                    }`}
                    key={index}
                  >
                    <div
                      className={`content max-w-[40%] break-words px-[1rem] py-[0.5rem] text-[1.1rem] rounded text-[#d1d1d1] ${
                        message.fromSelf ? "bg-[#4f04ff21]" : "bg-[#4e0eff]"
                      }`}
                    >
                      <p>{message.message}</p>
                    </div>
                  </div>
                ))}
            </div>
          )}

          <div className="chat-input">
            <ChatInput handleSendMsg={handleSendMsg} />
          </div>
        </div>
      )}
    </>
  );
};

export default ChatContainer;
