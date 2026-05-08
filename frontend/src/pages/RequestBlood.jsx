import React, { useState } from "react";
import "./RequestBlood.css";
import API from "../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function RequestBlood() 
{
  const [form, setForm] = useState({
    bloodGroup: "",
    units: "",
    location: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e)=> 
  {
    e.preventDefault();
    setLoading(true);

    try 
    {
      await API.post("/request", form);

      toast.success("Request sent successfully 🩸✅");

      setForm({
        bloodGroup: "",
        units: "",
        location: "",
        message: "",
      });

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);

    } 
    catch(err) 
    {
      toast.error(err.response?.data?.message || "Error ❌");
    } 
    finally 
    {
      setLoading(false);
    }
  };

  return (
    <div className="request-container">
      <form className="request-form" onSubmit={handleSubmit}>
        <h2 className="request-title">Request Blood</h2>

        <select
          name="bloodGroup"
          value={form.bloodGroup}
          onChange={handleChange}
          required
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
          name="units"
          placeholder="Units"
          value={form.units}
          onChange={handleChange}
        />

        <input
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          required
        />

        <input
          name="message"
          placeholder="Message"
          value={form.message}
          onChange={handleChange}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send Request"}
        </button>
      </form>
    </div>
  );
}

export default RequestBlood;