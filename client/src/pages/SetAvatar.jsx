import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Buffer } from "buffer";
import multiavatar from "@multiavatar/multiavatar";


// Import Files
import Loader from "../components/Loader";
import axios from "../components/axios";

const SetAvatar = () => {
  const api = "https://api.multiavatar.com";
  const navigate = useNavigate();

  const toastOptions = {
    position: "bottom-right",
    autoClose: 2000,
    pauseHover: true,
    draggable: true,
    theme: "dark",
  };

  const [avatars, setAvatars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

  const config = {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  };

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please Select an Avatar!", toastOptions);
    } else {
      const user = await JSON.parse(localStorage.getItem("user"));
      const { data } = await axios.post(
        `/api/auth/setAvatar/${user._id}`,
        {
          image: avatars[selectedAvatar],
        },
        config
      );

      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem("user", JSON.stringify(user));
        toast.success("Avatar Set Successfully!", toastOptions);
        navigate("/");
      } else {
        toast.error("Error while Setting Avatar. Plz Try Again!", toastOptions);
      }
    }
  };

  const checkAuthorization = async () => {
    try {
      const { data } = await axios.get("/", config);

      if (!data.status) {
        const error = new Error(data.error);
        throw error;
      }
    } catch (error) {
      navigate("/login");
    }
  };

  // useEffect(() => {
  //   const fetchAvatars = async () => {
  //     const data = [];
  //     for (let i = 0; i < 4; i++) {
  //       const image = await axios.get(
  //         `${api}/${Math.round(Math.random() * 1000)}`
  //       );

  //       const buffer = new Buffer(image.data);
  //       data.push(buffer.toString("base64"));
  //     }

  //     setAvatars(data);
  //     setLoading(false);
  //   };
  //   checkAuthorization();
  //   fetchAvatars();
  // }, []);

  // Check if Avatar Already Selected;
  
useEffect(() => {
  const fetchAvatars = () => {
    const data = [];
    for (let i = 0; i < 4; i++) {
      const svgCode = multiavatar(Math.round(Math.random() * 1000).toString());
      const base64 = btoa(unescape(encodeURIComponent(svgCode)));
      data.push(base64);
    }
    setAvatars(data);
    setLoading(false);
  };

  checkAuthorization();
  fetchAvatars();
}, []);

  
  useEffect(() => {
    const fetchFromLocal = async () => {
      const userData = await JSON.parse(localStorage.getItem("user"));
      if (userData.isAvatarImageSet) {
        navigate("/");
      }
    };
    fetchFromLocal();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="avatar_page h-[100vh] w-[100vw] bg-[#131324] text-white ">
          <div className="content h-screen flex flex-col items-center justify-center gap-[3rem]">
            <h1 className="text-2xl font-bold">
              Pick an avatar as your profile picture!
            </h1>

            <div className="avatars flex items-center justify-center gap-[2rem]">
              {avatars.map((avatar, index) => (
                <div
                  className={`rounded-[5rem] p-[0.4rem] transition duration-500 ease-in-out ${
                    selectedAvatar === index &&
                    "border-2 border-[#4e0eff] border-solid"
                  }`}
                  key={index}
                >
                  <img
                    className="h-[6rem] cursor-pointer"
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatar"
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              ))}
            </div>
            <button
              className="px-[2rem] py-[0.7rem] bg-[#7662DB] hover:bg-[#4e0eff] uppercase rounded text-white font-bold text-md"
              type="submit"
              onClick={setProfilePicture}
            >
              Set as Profile Picture
            </button>
          </div>
        </div>
      )}

      <ToastContainer />
    </>
  );
};

export default SetAvatar;
