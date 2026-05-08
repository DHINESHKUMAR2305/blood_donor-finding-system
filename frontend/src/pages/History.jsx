import React, { useEffect, useState } from "react";
import "./History.css";
import API from "../services/api";
import { toast } from "react-toastify";

function History() 
{
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await API.get("/request/my");
      setData(res.data);
    } catch (error) {
      toast.error("Error fetching history ❌");
    }
  };

  return (
    <div className="container">
      <h2>Request History</h2>
      {data.length === 0 && <p>No requests found ❌</p>}


      <div className="cards">
        {data.map((item) => (
          <div key={item._id} className="card">
            <p><strong>Blood Group:</strong> {item.bloodGroup}</p>
            <p><strong>City:</strong> {item.location}</p>
            <p><strong>Units:</strong> {item.units}</p>
            <p><strong>Message:</strong> {item.message || "N/A"}</p>

            <p className="date"> <strong>Date:</strong>
              {new Date(item.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default History;