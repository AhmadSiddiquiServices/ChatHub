const express = require("express");
const router = express.Router();

const {
  registerController,
  loginController,
  logoutController,
  setAvatarController,
  allUsersController,
} = require("../controllers/userControllers");

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/logout", logoutController);
router.post("/setAvatar/:id", setAvatarController);
router.get("/allUsers/:id", allUsersController);

module.exports = router;
