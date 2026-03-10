import React from "react";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();
  return <div>{`Welcome to dashboard ${user}`}</div>;
};

export default Dashboard;
