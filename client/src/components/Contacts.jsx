import React, { useState, useEffect } from "react";

// Import Files
import Loader from "./Loader";

const Contacts = ({ currentUser, contacts, changeChat }) => {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    if (currentUser) {
      setCurrentUserName(currentUser.username);
      setCurrentUserImage(currentUser.avatarImage);
    }
  }, [currentUser]);

  const changeCurrentChat = async (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <>
      {currentUserName && currentUserImage && (
        <div className="contacts_component grid grid-rows-[15%,70%,15%] h-[85vh] bg-[#080420] overflow-hidden">
          <div className="logo flex items-center justify-center ">
            <img className="h-[4rem]" src="/images/logo.png" alt="logo" />
          </div>
          <div className="contacts_section  scroll-bar flex flex-col gap-[0.7rem] overflow-auto ">
            {contacts.map((contact, index) => (
              <div
                className={`contact mx-[0.5rem] flex items-center justify-start gap-[1rem] cursor-pointer bg-[#ffffff39] p-[0.5rem] min-h-[5rem] transition duration-500 ease-in-out ${
                  currentSelected === index ? "bg-red-500" : ""
                }`}
                key={index}
                onClick={() => changeCurrentChat(index, contact)}
              >
                <div className="avatar">
                  <img
                    className="h-[3rem]"
                    src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                    alt="avatar"
                  />
                </div>
                <div className="username">
                  <h3 className="text-white">{contact.username}</h3>
                </div>
              </div>
            ))}
          </div>
          <div className="current_user flex items-center justify-center gap-[2rem] mb-0 pb-0 bg-[#0d0d30]">
            <div className="avatar">
              <img
                className="h-[3rem]"
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
              />
            </div>
            <div className="username font-bold text-xl">
              <h3 className="text-white">{currentUserName}</h3>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Contacts;
