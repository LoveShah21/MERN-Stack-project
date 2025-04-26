import React from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc"; // Google Icon
import { FaFacebook, FaApple, FaLinkedin } from "react-icons/fa"; // Facebook, Apple, LinkedIn Icons
import {
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  OAuthProvider,
} from "firebase/auth";
import { auth } from "../db/firebase";

const LoginButtons = () => {
  const navigate = useNavigate(); // Use the useNavigate hook

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, new GoogleAuthProvider());
      const idToken = await result.user.getIdToken(true);

      // Send idToken to backend to get custom JWT
      const response = await fetch(
        "http://localhost:5000/api/auth/firebase-login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idToken }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("auth_token", data.token); // Store custom JWT
        localStorage.setItem("user", true);
        localStorage.setItem("role", "user");

        // Redirect to home page after successful login
        navigate("/");
      } else {
        throw new Error(data.message || "Failed to login");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      const result = await signInWithPopup(auth, new FacebookAuthProvider());
      const idToken = await result.user.getIdToken();

      // Send idToken to backend to get custom JWT
      const response = await fetch(
        "http://localhost:5000/api/auth/firebase-login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idToken }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token); // Store custom JWT
      } else {
        throw new Error(data.message || "Failed to login");
      }
    } catch (error) {
      console.error("Facebook login error:", error);
    }
  };

  const handleAppleLogin = async () => {
    try {
      const provider = new OAuthProvider("apple.com");
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();

      // Send idToken to backend to get custom JWT
      const response = await fetch(
        "http://localhost:5000/api/auth/firebase-login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idToken }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token); // Store custom JWT
      } else {
        throw new Error(data.message || "Failed to login");
      }
    } catch (error) {
      console.error("Apple login error:", error);
    }
  };

  return (
    <div className="mb-3 d-flex justify-content-center mb-4">
      <button
        onClick={handleGoogleLogin}
        className="text-decoration-none mx-2 shadow-lg p-2 bg-white rounded-3 border w-75"
      >
        <FcGoogle size={32} /> {/* Google Icon */}
      </button>
      {/* <button
        onClick={handleFacebookLogin}
        className="text-decoration-none mx-2 shadow-lg p-2 rounded-circle"
        style={{ background: "blue" }}
      >
        <FaFacebook size={32} color="white" /> Facebook Icon
      </button>
      <button
        onClick={handleAppleLogin}
        className="text-decoration-none mx-2 shadow-lg p-2 bg-black rounded-circle"
      >
        <FaApple size={32} color="white" />
        Apple Icon
      </button> */}
    </div>
  );
};

export default LoginButtons;
