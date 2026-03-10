import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./Pages/Signup.jsx";
import Login from "./Pages/login.jsx";
import ProtectedRoute from "./configs/ProtectedRoute.jsx";
import Dashboard from "./Pages/Dashboard.jsx";
import Navbar from "./components/Navbar.jsx";

const App = () => {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/Register" element={<Signup />} />
        <Route path="/Login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
