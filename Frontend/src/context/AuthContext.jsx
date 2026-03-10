import { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import axiosInstance from "../configs/axiosInstance";

import { useEffect } from "react";

const authcontext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState(null);
  const [success, setSuccess] = useState(null);

  const fetchdata = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/user/auth/profile");
      if (res.data.userlogin === true) {
        setIsLoggedIn(true);
        setUser(res.data.username);
        setSuccess(true);
        setLoading(false);
        console.log("data fetched");
      }
    } catch (error) {
      console.log(error.response?.data.msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchdata();
    console.log("Is logged in : ", isLoggedIn);
  }, []);

  const signup = async (username, password) => {
    try {
      setLoading(true);
      const res = await axiosInstance.post("/user/auth/signup", {
        username,
        password,
      });
      if (res.data.success === true) {
        setIsLoggedIn(true);
        setMsg(res.data);
        if (res.data.success === true) {
          setSuccess(true);
        } else {
          setSuccess(false);
        }
        setLoading(false);
      } else {
        console.log(res.data.msg);
        setSuccess(false);

        alert("Login failed. check console.");
      }
    } catch (error) {
      console.log("Error setting user.\n", error);
      console.log(msg);
      setIsLoggedIn(false);
      setSuccess(false);
      setMsg(error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  const Login = async (username, password, navigate) => {
    try {
      setLoading(true);
      const res = await axiosInstance.post("/user/auth/login", {
        username,
        password,
      });
      if (res.data.success === true) {
        setSuccess(true);
        setUser(res.data.username);
        setIsLoggedIn(true);
        setMsg(res.data);
        navigate("/dashboard");
      } else {
        setMsg(res.data);
        setSuccess(false);
      }
    } catch (error) {
      console.log("Error loggin in.", error);
      setSuccess(false);
      setMsg(error.response?.data);
      console.log(error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  const Logout = async () => {
    try {
      await axiosInstance.post("/user/auth/logout");
      setUser(null);
      setIsLoggedIn(false);
      setSuccess(null);
      setMsg(null);
      navigate("/login");
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  return (
    <authcontext.Provider
      value={{
        user,
        signup,
        isLoggedIn,
        loading,
        setLoading,
        success,
        msg,
        setMsg,
        Login,
        Logout,
      }}
    >
      {children}
    </authcontext.Provider>
  );
};

export const useAuth = () => useContext(authcontext);
