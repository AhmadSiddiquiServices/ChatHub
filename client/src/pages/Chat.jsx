import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import Files
import axios from "../components/axios";
import Loader from "../components/Loader";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";

const Chat = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 2000,
    pauseHover: true,
    draggable: true,
    theme: "dark",
  };
  const config = {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  };

  const checkAuthorization = async () => {
    try {
      const { data } = await axios.get("/", config);

      if (!data.status) {
        const error = new Error(data.error);
        throw error;
      }
    } catch (error) {
      navigate("/login");
    }
  };

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  useEffect(() => {
    checkAuthorization();
    setLoading(true);
  }, []);

  useEffect(() => {
    const fetchFromLocal = async () => {
      if (localStorage.getItem("user")) {
        setCurrentUser(await JSON.parse(localStorage.getItem("user")));
      }
    };
    fetchFromLocal();
  }, []);

  useEffect(() => {
    console.log("Entered in ChatHub");
    const fetchUserData = async () => {
      if (currentUser) {
        console.log("currentUser ==> ", currentUser);
        if (currentUser.isAvatarImageSet) {
          const { data } = await axios.get(
            `/api/auth/allUsers/${currentUser._id}`
          );
          setLoading(false);
          setContacts(data);
        } 
        else {
          navigate("/setAvatar");
        }
      }
    };

    fetchUserData();
  }, [currentUser]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="chat_page h-[100vh] w-[100vw] bg-[#131324] flex items-center justify-center overflow-hidden">
          <div className="content h-[85vh] w-[85vw] bg-[#00000076] grid grid-cols-12 ">
            <div className="col-span-3">
              <Contacts
                currentUser={currentUser}
                contacts={contacts}
                changeChat={handleChatChange}
              />
            </div>
            <div className="col-span-9">
              {currentChat === undefined ? (
                <Welcome currentUser={currentUser} />
              ) : (
                <ChatContainer
                  currentUser={currentUser}
                  currentChat={currentChat}
                />
              )}
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default Chat;
