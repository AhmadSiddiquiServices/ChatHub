import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SetAvatar from "./pages/SetAvatar";
import PageNotFound from "./pages/PageNotFound";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Chat />} />
        <Route path="/setAvatar" element={<SetAvatar />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
