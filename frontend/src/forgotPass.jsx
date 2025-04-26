import React, { useState } from "react";
import "./css/forgotPass.css";
import img1 from "./assets/fp/image.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/send-otp", { email });
      localStorage.setItem('currentEmail', email);
      if (response.data.success) {
        alert('OTP sent successfully');
        navigate("/verify");
      } else {
        alert("Failed to send OTP");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert("Error sending OTP");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 w-50">
        <div className="row">
          <div className="col">
            <img
              src={img1}
              alt="forgot-pass"
              className="image-fluid"
              style={{ maxWidth: "100%", height: "" }}
            />
          </div>
          <div className="col-md-6">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Forgot Password</h2>
              <p className="text-center mb-4">Enter email and we'll send you code to</p>
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <input
                    type="email"
                    className="form-control rounded-pill"
                    id="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-50 rounded-pill mx-auto d-block">
                  Send OTP
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;