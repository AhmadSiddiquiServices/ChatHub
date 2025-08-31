import axios from "axios";

const instance = axios.create({
  baseURL: "https://chathub-v54n.onrender.com",
});

export default instance;
