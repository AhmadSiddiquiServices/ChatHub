const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const colors = require("colors");
const cookieParser = require("cookie-parser");

// Import Files
const DbConnection = require("./db/DbConnection");
const userRoutes = require("./routes/userRoutes");
const authorizedPagesRoutes = require("./routes/authorizedPagesRoutes");
const messageRoutes = require("./routes/messageRoutes");

const app = express();
dotenv.config();

// Database Connection
DbConnection();

// middlewares
app.use(
  cors({
    origin: "https://chat-hub-smoky.vercel.app",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
const PORT = process.env.PORT || 8000;

// Routes
app.use("/api/auth", userRoutes);
app.use("/", authorizedPagesRoutes);
app.use("/api/messages", messageRoutes);

// app.get("/", authenticate, (req, res) => {
//   res.json({ status: true, msg: "Chat Page!", user: req.user });
// });

// Server Listen
app.listen(PORT, () => {
  console.log(colors.blue.inverse(`Server is Listening on PORT ${PORT}`));
});
