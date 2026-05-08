import React, { useState } from "react";
import "./SearchDonor.css";
import API from "../services/api";
import { toast } from "react-toastify";
import {  useNavigate } from "react-router-dom";

function SearchDonor() {
  const [bloodGroup, setBloodGroup] = useState("");
  const [city, setCity] = useState("");
  const [donors, setDonors] = useState([]);

  const navigate = useNavigate();

  const search = async()=> 
  {
    if (!bloodGroup && !city) 
      {
      return toast.warning("Enter at least one filter ⚠️");
    }

    try 
    {
      const res = await API.get(
  `/user/search?bloodGroup=${encodeURIComponent(bloodGroup)}&city=${encodeURIComponent(city)}`
);

      setDonors(res.data);

      if (res.data.length === 0) 
      {
        toast.info("No donors found ❌");
      }
    } 
    catch(error) 
    {
      toast.error("Please login first ❌");
      navigate("/login");
    }
  };

  return (
    <div className="container">
      <h2>Search Donors</h2>

      <select
        value={bloodGroup}
        onChange={(e) => setBloodGroup(e.target.value)}
      >
        <option value="">Select Blood Group</option>
        <option value="A+">A+</option>
        <option value="A-">A-</option>
        <option value="B+">B+</option>
        <option value="B-">B-</option>
        <option value="AB+">AB+</option>
        <option value="AB-">AB-</option>
        <option value="O+">O+</option>
        <option value="O-">O-</option>
      </select>

      <input
        placeholder="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <button onClick={search}>Search</button>

        <div className="cards">
          {donors.map((d) => (
            <div key={d._id} className="card">
              <p><strong>Name:</strong> {d.name}</p>
              <p><strong>Phone:</strong> {d.phone}</p>
              <p><strong>Address:</strong> {d.address}</p>
              <p><strong>Blood Group:</strong> {d.bloodGroup}</p>
            </div>
          ))}
        </div>
    </div>
  );
}

export default SearchDonor;