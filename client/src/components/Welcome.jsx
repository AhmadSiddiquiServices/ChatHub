import React from "react";

const Welcome = ({ currentUser }) => {
  return (
    <>
      {currentUser && (
        <div className="message_component text-white flex flex-col items-center justify-center h-full">
          <img className="h-[20rem]" src="/images/robot.gif" alt="robot" />

          <h1 className="text-2xl">
            Welcome,
            <span className="text-[#4e00ff] font-extrabold">
              {" "}
              {currentUser.username}
            </span>
          </h1>
          <h3 className="text-xl">Please select a chat to start Messaging!</h3>
        </div>
      )}
    </>
  );
};

export default Welcome;
