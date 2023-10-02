import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//  Import Files
import axios from "../components/axios";
import Loader from "../components/Loader";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const toastOptions = {
    position: "bottom-right",
    autoClose: 2000,
    pauseHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    if (handleValidations()) {
      const { data } = await axios.post("/api/auth/login", values, config);

      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      } else if (data.status === true) {
        localStorage.setItem("user", JSON.stringify(data.user));
        toast.success(data.msg, toastOptions);
        navigate("/");
      }
    }
  };

  const handleValidations = () => {
    const { email, password } = values;
    if (email === "" || password === "") {
      toast.error("Plz fill all the Fields!", toastOptions);
      return false;
    }
    return true;
  };

  const checkUserAuth = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      navigate("/");
    }
  };

  useEffect(() => {
    setLoading(false);
    checkUserAuth();
  }, []);
  return (
    <>
      <ToastContainer />
      {loading ? (
        <Loader />
      ) : (
        <div className="chat_page h-[100vh] w-[100vw] bg-[#131324]">
          <div className="center_block h-screen flex flex-col items-center justify-center ">
            <div className="bg-[#00000076]  lg:w-[40%] md:w-[80%] sm:w-[80%] mx-auto py-[1rem] rounded-3xl flex flex-col items-center justify-center">
              <div className=" w-full flex flex-col items-center justify-center">
                <div className="logo my-[1.5rem]">
                  <img
                    className="h-[5rem] "
                    src="/images/logo.png"
                    alt="chathub_logo"
                  />
                </div>
                <div className="fields w-2/3">
                  <form
                    className="flex flex-col gap-6 "
                    onSubmit={handleSubmit}
                  >
                    <input
                      className=" b-0 p-3 bg-transparent rounded-md text-[#fefefe] border border-[#4e0eff] outline-none"
                      type="email"
                      name="email"
                      placeholder="Email"
                      onChange={(e) => handleChange(e)}
                    />
                    <input
                      className=" b-0 p-3 bg-transparent rounded-md text-[#fefefe] border border-[#4e0eff] outline-none"
                      type="password"
                      name="password"
                      placeholder="Password"
                      onChange={(e) => handleChange(e)}
                    />
                    <button
                      className="px-[2rem] py-[0.7rem] bg-[#7662DB] hover:bg-[#4e0eff] uppercase rounded text-white font-bold text-md"
                      type="submit"
                    >
                      Sign In
                    </button>
                  </form>

                  <p className="text-white my-4 text-center">
                    Don't Have An Account?
                    <Link
                      to="/register"
                      className="text-[#4e0eff] hover:text-[#7662DB]  ml-2"
                    >
                      Register
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
