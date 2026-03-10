import React, { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { Link } from "react-router-dom";

const Spinner = () => (
  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
);

const Signup = () => {
  const { user, signup, msg, success, loading, setMsg } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    await signup(username, password);

    setTimeout(() => {
      setUsername("");
      setPassword("");
      setMsg(null);
    }, 2000);
  };

  return (
    <div>
      <form
        action=""
        onSubmit={handleSignUp}
        className="h-screen justify-center flex items-center bg-[#222222]"
      >
        <div className="Register-container">
          <h1 className="text-white text-2xl  bg-[#101010] p-2 text-center rounded-t">
            Register
          </h1>
          <div className="form-container bg-[#141414] p-14 text-white flex flex-col gap-4 rounded-b ">
            {msg?.msg && (
              <p
                className={`text-sm text-center ${success ? "text-green-400" : "text-red-400"}`}
              >
                {msg.msg}
              </p>
            )}
            <div className="username-div flex flex-col">
              <label
                htmlFor=""
                className="text-lg text-white tracking-wide mb-1"
              >
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="text-black py-2.5 px-3 min-w-80 outline-none border-2 rounded focus:border-blue-900 focus:border-2"
              />
            </div>
            <div className="username-div flex flex-col">
              <label
                htmlFor=""
                className="text-lg text-white tracking-wide mb-1"
              >
                password
              </label>
              <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="text-black py-2.5 px-3 min-w-80 outline-none border-2 rounded focus:border-blue-900 focus:border-2"
              />
            </div>
            <button
              className="w-full bg-[#252525] p-3 rounded mt-2 hover:bg-[#303030] flex gap-2 justify-center"
              disabled={loading}
            >
              <div> {loading ? "Registering..." : "Register"}</div>
              <div className="flex justify-center items-center">
                {" "}
                {loading && <Spinner />}
              </div>
            </button>
            <div className="flex justify-center gap-1 mt-4 -mb-7 text-[#f0f0f0]">
              Already Registered ?
              <Link className="underline text-cyan-500" to="/Login">
                Login here
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signup;
