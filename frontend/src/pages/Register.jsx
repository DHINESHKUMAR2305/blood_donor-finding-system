import React, { useState } from "react";
// import "./Register.css";
import API from "../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Register() 
{
  const [form, setForm] = useState(
    {
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    bloodGroup: "",
    age: "",
  });

  const navigate = useNavigate();

  const handleChange =(e)=> 
  {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit =async(e)=> 
  {
    e.preventDefault();

    try 
    {
      await API.post("/auth/register", form);

      toast.success("Registered Successfully ✅");
      navigate("/login");
    } 
    catch(err) 
    {
      toast.error(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit} autoComplete="off">
        <h2>Register</h2>

        <input
          name="name"
          placeholder="Name"
          autoComplete="off"
          onChange={handleChange}
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          autoComplete="off"
          onChange={handleChange}
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          autoComplete="new-password"
          onChange={handleChange}
          required
        />

        <input
          name="phone"
          placeholder="Phone"
          autoComplete="off"
          onChange={handleChange}
          required
        />

        <input
          name="address"
          placeholder="Address"
          autoComplete="off"
          onChange={handleChange}
          required
        />

        

        <input
          name="age"
          type="number"
          placeholder="Age"
          autoComplete="off"
          onChange={handleChange}
          required
        />


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


        <button type="submit">Register</button>
        
      </form>
    </div>
  );
}

export default Register;