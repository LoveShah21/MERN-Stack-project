import React, { useState, useRef } from 'react';
import './css/verifyCode.css';
import './styles/verifyCode.css';
import img1 from './assets/verifycode/image.jpg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const VerifyCode = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const navigate = useNavigate();
  const inputRefs = useRef([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpCode = otp.join("");
    try {
      const currentEmail = localStorage.getItem('currentEmail');
      const response = await axios.post("http://localhost:5000/api/auth/verify-otp", { email: currentEmail, otp: otpCode });
      if (response.data.success) {
        alert('OTP verified');
        navigate("/reset-password"); // Navigate to reset password page
      } else {
        alert("Invalid OTP");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      alert("Error verifying OTP");
    }
  };

  const handleChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Focus on the next input if a digit is entered
    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace key
    if (e.key === 'Backspace' && index > 0 && !otp[index]) {
      // If the current input is empty and backspace is pressed, focus on the previous input
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 w-50">
        <div className='row'>
          <div className="col">
            <img
              src={img1}
              alt="verify-code"
              className="image-fluid"
              style={{ maxWidth: '100%', height: '' }}
            />
          </div>
          <div className="col-md-6">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Verification Code</h2>
              <p className="text-center mb-4">Enter the code provided to you on your</p>
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3 d-flex justify-content-evenly">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      type="text"
                      className="form-control verification-input mx-1"
                      maxLength="1"
                      value={digit}
                      onChange={(e) => handleChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)} // Add keydown event
                      ref={(el) => (inputRefs.current[index] = el)} // Assign ref to each input
                      required
                    />
                  ))}
                </div>
                <button type="submit" className="btn btn-primary w-50 rounded-pill mx-auto d-block">
                  Verify
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyCode;