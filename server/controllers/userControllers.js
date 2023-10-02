const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const registerController = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existedUser = await User.findOne({ email });

    if (existedUser) {
      return res.json({ status: false, msg: "User Already Existed!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    return res.json({
      status: true,
      msg: "User Registered Successfully!",
      user: {
        username: user.username,
        email: user.email,
        password: user.password,
      },
    });
  } catch (error) {
    res.send(error);
  }
};

const loginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (!userExists) {
      return res.json({ status: false, msg: "User not Found!" });
    }

    const matchedPassword = await bcrypt.compare(password, userExists.password);
    if (!matchedPassword) {
      return res.json({ status: false, msg: "Invalid Credentials!" });
    }

    const token = await userExists.generateAuthToken();

    if (!token) {
      return res.json({ status: false, msg: "Something went Wrong!" });
    }

    res.cookie("jwToken", token, {
      expires: new Date(Date.now() + 86400000),
      httpOnly: true,
    });

    return res.json({
      status: true,
      msg: "User Logged In Successfully!",
      user: {
        _id: userExists._id,
        username: userExists.username,
        email: userExists.email,
        isAvatarImageSet: userExists.isAvatarImageSet,
        avatarImage: userExists.avatarImage,
        token,
      },
    });
  } catch (error) {
    res.send(error);
  }
};

const logoutController = (req, res) => {
  res.clearCookie("jwToken", { path: "/" });
  res.send({ status: true, msg: "Logged Out!" });
};

const setAvatarController = async (req, res) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;

    const user = await User.findByIdAndUpdate(userId, {
      isAvatarImageSet: true,
      avatarImage,
    });

    if (!user) {
      return res.send({ isSet: false, msg: "Error while setting Avatar!" });
    }

    return res.json({
      isSet: user.isAvatarImageSet,
      image: user.avatarImage,
    });
  } catch (error) {
    return res.send(error);
  }
};

const allUsersController = async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "username",
      "avatarImage",
      "_id",
    ]);

    if (users.length === 0) {
      return res.json({ status: false, msg: "No Contacts Found!" });
    }
    return res.json(users);
  } catch (error) {
    return res.send(error);
  }
};

module.exports = {
  registerController,
  loginController,
  logoutController,
  setAvatarController,
  allUsersController,
};
