import React, { useState } from "react";
import "./css/resetPassword.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import img1 from './assets/resetPass/reset.jpg';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validatePassword = () => {
    const newErrors = {};

    // Validate newPassword
    if (!newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters long";
    } else if (!/[A-Z]/.test(newPassword)) {
      newErrors.newPassword = "Password must contain at least one uppercase letter";
    } else if (!/[0-9]/.test(newPassword)) {
      newErrors.newPassword = "Password must contain at least one digit";
    } else if (!/[!@#$%^&*]/.test(newPassword)) {
      newErrors.newPassword = "Password must contain at least one special character";
    }

    // Validate confirmPassword
    if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form
    const isValid = validatePassword();
    if (!isValid) {
      return; // Stop if validation fails
    }

    try {
      const currentEmail = localStorage.getItem("currentEmail");
      const response = await axios.post("http://localhost:5000/api/auth/reset-password", {
        email: currentEmail,
        newPassword,
      });
      if (response.data.success) {
        alert("Password reset successfully!");
        navigate("/signin"); // Navigate to the login page after resetting the password
      } else {
        setErrors({ general: "Failed to reset password" });
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      setErrors({ general: "Error resetting password" });
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 w-50">
        <div className="row">
          <div className="col">
            <img
              src={img1}
              alt="reset-password"
              className="image-fluid"
              style={{ maxWidth: "100%", height: "" }}
            />
          </div>
          <div className="col-md-6">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Reset Password</h2>
              <p className="text-center mb-4">Enter your new password</p>
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <input
                    type="password"
                    className={`form-control rounded-pill ${errors.newPassword ? "is-invalid" : ""}`}
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                  {errors.newPassword && (
                    <div className="invalid-feedback">{errors.newPassword}</div>
                  )}
                </div>
                <div className="form-group mb-3">
                  <input
                    type="password"
                    className={`form-control rounded-pill ${errors.confirmPassword ? "is-invalid" : ""}`}
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  {errors.confirmPassword && (
                    <div className="invalid-feedback">{errors.confirmPassword}</div>
                  )}
                </div>
                {errors.general && (
                  <p className="text-danger text-center">{errors.general}</p>
                )}
                <button type="submit" className="btn btn-primary w-50 rounded-pill mx-auto d-block">
                  Reset Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;