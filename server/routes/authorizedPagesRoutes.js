const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/authenticate");
const chatPage = require("../controllers/authorizedPagesControllers");

router.get("/", authenticate, chatPage);

module.exports = router;
