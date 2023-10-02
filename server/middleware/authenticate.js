const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
require("dotenv").config();

const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.jwToken;
    const verifyToken = await jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await User.findOne({
      _id: verifyToken._id,
      "tokens.token": token,
    });

    if (!user) {
      throw new Error("User not Found!");
    }

    req.token = token;
    req.user = user;

    next();
  } catch (error) {
    res.send("Unauthorized: No Token Provided!");
  }
};

module.exports = authenticate;
