import { Outlet, useNavigate } from "react-router-dom";
import Blogs from "./Blogs";
import Header from "./Header";
import { useEffect } from "react";

const Dashboard = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if(localStorage.getItem("token")=='undefined')
    navigate("/");
  }, []);

  return (
    <div className=" bg-yellow-200">
      <Header />
      <Blogs />
    </div>
  );
};

export default Dashboard;
