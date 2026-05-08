import React from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">

      <div className="hero">
        <h1>Blood Donor Finder 🩸</h1>
        <p>
          Find blood donors instantly and save lives. Connect donors and
          recipients in emergency situations.
        </p>

        <div className="hero-buttons">
          <button onClick={() => navigate("/search")}>Find Donor</button>
          <button onClick={() => navigate("/register")}>Become Donor</button>
        </div>
      </div>


      <div className="section">
        <h2>Features</h2>

        <div className="featuress">
          <div className="card">
            <h3>🔍 Search Donors</h3>
            <p>Find donors based on blood group and city quickly.</p>
          </div>

          <div className="card">
            <h3>🩸 Request Blood</h3>
            <p>Send blood request and notify available donors instantly.</p>
          </div>

          <div className="card">
            <h3>📜 Request History</h3>
            <p>Track all your previous blood requests easily.</p>
          </div>

          <div className="card">
            <h3>👤 User Dashboard</h3>
            <p>Manage profile, update details, and control your activity.</p>
          </div>
        </div>
      </div>


      <div className="section">
        <h2>About Project</h2>
        <p className="about">
          Blood Donor Finder is a MERN stack web application designed to help
          people find blood donors during emergencies. It connects donors and
          recipients through a simple and efficient platform.
        </p>
      </div>

      <div className="section">
        <h2>Project Scope</h2>

        <ul className="scope">
          <li>✔ Real-time donor search</li>
          <li>✔ Email notification system</li>
          <li>✔ Secure login & authentication</li>
          <li>✔ User profile management</li>
          <li>✔ Scalable and responsive design</li>
        </ul>
      </div>

      <div className="cta">
        <h2>Donate Blood, Save Lives ❤️</h2>
        <button onClick={() => navigate("/register")}>
          Join Now
        </button>
      </div>
      <Footer />

    </div>
  );
}

export default Home;