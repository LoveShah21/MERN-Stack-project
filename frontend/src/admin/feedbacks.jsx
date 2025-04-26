import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import AdminNavbar from "../components/adminNavigation";

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  // Fetch all feedbacks from the backend
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/feedback");
        setFeedbacks(response.data); // Set feedbacks in state
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      }
    };

    fetchFeedbacks();
  }, []);

  return (
    <><div className='row'>
    <div className='col-md-2 me-5'>

  <AdminNavbar/>
    </div>
    <div className='col-md-8'>
    <div className="container mt-5">
      <h2>User Feedbacks</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Rating</th>
            <th>Feedback</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.map((feedback) => (
            <tr key={feedback._id}>
              <td>{feedback.name}</td>
              <td>{feedback.email}</td>
              <td>
                {Array(feedback.rating)
                  .fill()
                  .map((_, i) => (
                    <span key={i} style={{ color: "#ffc107" }}>
                      ★
                    </span>
                  ))}
              </td>
              <td>{feedback.message}</td>
              <td>{new Date(feedback.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
    </div>
    </div>
    </>
  );
};

export default Feedback;