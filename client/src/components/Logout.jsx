import React from "react";
import { useNavigate } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import Files
import axios from "../components/axios";

const Logout = () => {
  const navigate = useNavigate();

  const toastOptions = {
    position: "bottom-right",
    autoClose: 2000,
    pauseHover: true,
    draggable: true,
    theme: "dark",
  };
  const config = {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  };

  const logout = async () => {
    try {
      const { data } = await axios.get("/api/auth/logout", config);

      if (data.status) {
        toast.success(data.msg, toastOptions);
        await localStorage.removeItem("user");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button
        className="p-[0.5rem] rounded bg-[#9a86f3] border-none cursor-pointer hover:bg-[#4e0eff]"
        onClick={logout}
      >
        <BiPowerOff size={20} />
      </button>
      <ToastContainer />
    </>
  );
};

export default Logout;
