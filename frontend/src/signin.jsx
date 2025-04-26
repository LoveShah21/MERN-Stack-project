import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import img1 from "./assets/signin/image.jpg";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import './styles/signin.css';

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    const rememberedPassword = localStorage.getItem("rememberedPassword");

    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRememberMe(true);
    }
    if (rememberedPassword) {
      setPassword(rememberedPassword);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );
      localStorage.setItem("auth_token", response.data.token);
      localStorage.setItem("user", true);
      localStorage.setItem("role", 'user');

      if (rememberMe) {
        localStorage.setItem("rememberedEmail", email);
        localStorage.setItem("rememberedPassword", password);
      } else {
        localStorage.removeItem("rememberedEmail");
        localStorage.removeItem("rememberedPassword");
      }

      console.log("Login successful:", response.data);
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "You have successfully logged in!",
      }).then((result) => {
        if (result.isConfirmed) {
          if (response.data.user.isAdmin) {
            localStorage.setItem('role', 'admin');
            navigate("/admin/Feedback");
          } else {
            navigate("/");
          }
        }
      });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Login failed. Please try again.";
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: errorMessage,
      });
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 w-50">
        <div className="row">
          <div className="col">
            <img
              src={img1}
              alt="signin"
              className="image-fluid"
              style={{ maxWidth: "100%", height: "" }}
            />
          </div>
          <div className="col my-auto">
            <h2 className="text-center text-dark mb-4">Good To See You Again!</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control rounded-pill"
                  id="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control rounded-pill"
                  id="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label className="form-check-label" htmlFor="rememberMe">
                  Remember me
                </label>
              </div>
              <button
                type="submit"
                className="btn btn-primary w-50 rounded-pill mx-auto d-block"
              >
                Sign In
              </button>
              <div className="text-center float-start">
                <Link to="/signup" className="text-decoration-none">
                  Create an account?
                </Link>
              </div>
              <div className="text-center float-end">
                <Link to="/forgot-password" className="text-decoration-none">
                  Forgot Password?
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;