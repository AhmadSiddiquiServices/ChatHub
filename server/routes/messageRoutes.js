const express = require("express");
const router = express.Router();

const {
  addMessage,
  getAllMessages,
} = require("../controllers/messageControllers");

router.post("/addMsg", addMessage);
router.post("/getMsg", getAllMessages);

module.exports = router;
