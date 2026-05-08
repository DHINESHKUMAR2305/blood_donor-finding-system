import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Navbar.css";

function Navbar() 
{

  const navigate = useNavigate();


  const token = localStorage.getItem("token");

  const handleLogout =()=> 
  {
    localStorage.removeItem("token");
    toast.success("Logout Successful ");
    navigate("/");
  };

  return (
    <div className="navbar">
      <h2>Blood Donor</h2>

      <div className="links">
        <Link to="/">Home</Link>

        {!token && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}

        {token && (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <button className="logout" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;