import React, { useState } from "react";
import { RiSendPlaneFill } from "react-icons/ri";
import { BsEmojiSmileFill } from "react-icons/bs";
import Picker from "emoji-picker-react";

const ChatInput = ({ handleSendMsg }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState("");

  const handleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = ({ emoji }) => {
    console.log(emoji);
    let message = msg;
    message += emoji;
    setMsg(message);
  };

  const sendMsg = (e) => {
    e.preventDefault();
    handleSendMsg(msg);
    setMsg("");
  };

  return (
    <div className="chat_input_component h-full w-full px-[2rem] flex items-center justify-center space-x-5 bg-[#080420] ">
      <div className="button_container">
        <div className="emoji text-[#ffff00c8] cursor-pointer relative hover:text-yellow-400">
          <BsEmojiSmileFill size={25} onClick={handleEmojiPicker} />
          <div className="absolute bottom-[25px] ">
            {showEmojiPicker && (
              <Picker
                width={320}
                height={350}
                onEmojiClick={handleEmojiClick}
              />
            )}
          </div>
        </div>
      </div>
      <form
        className="input_container w-full space-x-4 bg-[#ffffff34] rounded-2xl flex items-center"
        onSubmit={sendMsg}
      >
        <input
          className="w-[90%] border-none bg-transparent px-[1rem] py-[0.4rem] outline-none  "
          type="text"
          placeholder="Type your message here..."
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <button
          type="submit"
          className="bg-[#9a86f3] flex items-center justify-end px-[1.7rem] py-[0.6rem] rounded-2xl hover:bg-[#4e0eff]"
        >
          <RiSendPlaneFill size={20} />
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
