import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import API from "../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Dashboard() 
{
  const [user, setUser] = useState({});
  const [edit, setEdit] = useState(false);
  const navigate = useNavigate();

  useEffect(()=>
    {
      fetchProfile();
  }, []);

  const fetchProfile = async()=> 
    {
    try 
    {
      const res = await API.get("/user/profile");
      setUser(res.data);
    } catch 
    {
      toast.error("Error fetching profile ❌");
    }
  };

  const handleUpdate = async()=> 
  {
    try 
    {
      await API.put("/user/profile", user);
      toast.success("Profile Updated ✅");
      setEdit(false);
    } 
    catch(err)
    {
      toast.error(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">

        <h2 className="dashboard-title">Dashboard</h2>

        <div className="dashboard-field">
          <label>Name:</label>
          <p>{user.name}</p>
        </div>

        <div className="dashboard-field">
          <label>Email:</label>
          {edit ?(
            <input
              value={user.email || ""}
              onChange={(e) =>
                setUser({ ...user, email: e.target.value })
              }
            />
          ) : (
            <p>{user.email}</p>
          )}
        </div>

        <div className="dashboard-field">
          <label>Phone:</label>
          {edit?(
            <input
              value={user.phone || ""}
              onChange={(e) =>
                setUser({ ...user, phone: e.target.value })
              }
            />
          ) : (
            <p>{user.phone}</p>
          )}
        </div>

        <div className="dashboard-field">
          <label>Address:</label>
          {edit?(
            <input
              value={user.address || ""}
              onChange={(e) =>
                setUser({ ...user, address: e.target.value })
              }
            />
          ):(
            <p>{user.address}</p>
          )}
        </div>

        <div className="dashboard-field">
          <label>Blood Group:</label>
          <p>{user.bloodGroup}</p>
        </div>


        <div className="dashboard-buttons">
          {edit?(
            <button onClick={handleUpdate}>Save</button>
          ) : (
            <button onClick={() => setEdit(true)}>Edit</button>
          )}

          <button onClick={() => navigate("/request")}>
            Request Blood
          </button>

          <button onClick={() => navigate("/search")}>
            Search Donors
          </button>

          <button onClick={() => navigate("/history")}>
            History
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;