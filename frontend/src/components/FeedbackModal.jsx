import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { FaStar } from "react-icons/fa"; // Import star icons
import axios from "axios"; // Import axios for API calls
import "../css/feedback.css";

const FeedbackModal = ({ show, handleClose }) => {
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0); // State to store the rating
  const [hover, setHover] = useState(0); // State to handle hover effect

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare feedback data
    const feedbackData = {
      message: feedback,
      rating: rating,
    };

    try {
      const token = localStorage.getItem('auth_token');
      // Send POST request to backend
      const response = await axios.post(
        "http://localhost:5000/api/feedback", // URL
        feedbackData, // Data (payload)
        {
          headers: {
            Authorization: `Bearer ${token}`, // Headers
          },
        }
      );
      console.log("Feedback submitted successfully:", response.data);
      handleClose(); // Close the modal
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Feedback</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {/* Star Rating Section */}
          <Form.Group
            controlId="ratingForm"
            className="mb-3 d-flex flex-column justify-content-center align-items-center"
          >
            <Form.Label>Rate your experience</Form.Label>
            <div className="d-flex">
              {[...Array(5)].map((star, index) => {
                const ratingValue = index + 1;
                return (
                  <label key={index}>
                    <input
                      type="radio"
                      name="rating"
                      value={ratingValue}
                      onClick={() => setRating(ratingValue)}
                      style={{ display: "none" }} // Hide the radio button
                    />
                    <FaStar
                      className="star mx-2"
                      color={
                        ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"
                      }
                      size={30}
                      onMouseEnter={() => setHover(ratingValue)}
                      onMouseLeave={() => setHover(0)}
                      style={{ cursor: "pointer" }}
                    />
                  </label>
                );
              })}
            </div>
          </Form.Group>

          {/* Feedback Text Area */}
          <Form.Group controlId="feedbackForm" className="mb-3">
            <Form.Label>Please provide your feedback</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              required
            />
          </Form.Group>

          {/* Submit Button */}
          <Button variant="primary" type="submit">
            Submit Feedback
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default FeedbackModal;