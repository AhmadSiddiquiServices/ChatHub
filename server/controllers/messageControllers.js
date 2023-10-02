const Message = require("../models/messageModel");

const addMessage = async (req, res) => {
  try {
    const { from, to, message } = req.body;

    const data = await Message.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });

    if (!data) {
      return res.json({ status: false, msg: "Failed to Send Message!" });
    }
    return res.json({ status: true, msg: "Message added Successfully!" });
  } catch (error) {
    return res.send({ msg: "Something Went Wrong!" });
  }
};

const getAllMessages = async (req, res) => {
  try {
    const { from, to } = req.body;

    const messages = await Message.find({ users: { $all: [from, to] } }).sort({
      updatedAt: 1,
    });

    const projectMessages = messages.map((message) => {
      return {
        fromSelf: message.sender.toString() === from,
        message: message.message.text,
      };
    });

    return res.json(projectMessages);
  } catch (error) {
    return res.send({ msg: "Something Went Wrong!" });
  }
};

module.exports = {
  addMessage,
  getAllMessages,
};
