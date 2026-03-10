import React from "react";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, Logout, Loading, isLoggedIn } = useAuth();
  const handleLogout = (e) => {
    e.preventDefault();
    Logout();
  };

  return (
    <div>
      <div className="nav-container bg-[#151515] text-[#f2f2f2] flex justify-between p-2 px-10">
        <div className="logoside text-xl font-semibold  flex items-center">
          AuthApp
        </div>
        <div className="buttons">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 p-2 rounded px-5"
            >
              Logout
            </button>
          ) : (
            " "
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
