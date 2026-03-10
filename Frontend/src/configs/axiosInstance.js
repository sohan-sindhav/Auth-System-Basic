import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://auth-system-basic-1.onrender.com",
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
