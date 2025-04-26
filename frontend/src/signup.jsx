import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import img1 from './assets/login_page/image.jpg';
import axios from 'axios';
import Swal from 'sweetalert2';

const SignUp = () => {
  // State to manage form inputs
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    newPassword: '',
    confirmPassword: '',
  });

  // State to manage validation errors
  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    console.log('Input Changed:', id, value); // Debugging line
    setFormData((prevData) => ({ ...prevData, [id]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [id]: '' })); // Clear error on change
  };

  // Function to validate the form
  const validateForm = () => {
    const newErrors = {};

    // Validate name
    if (!formData.name) {
      newErrors.name = 'Name is required';
    } else if (!/^[A-Za-z\s]+$/.test(formData.name)) {
      newErrors.name = 'Name should only contain letters and spaces';
    }

    // Validate email
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Validate phone number
    if (!formData.phone) {
      newErrors.phone = 'Contact number is required';
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    // Validate new password
    if (!formData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters long';
    } else if (!/[A-Z]/.test(formData.newPassword)) {
      newErrors.newPassword = 'Password must contain at least one uppercase letter';
    } else if (!/[0-9]/.test(formData.newPassword)) {
      newErrors.newPassword = 'Password must contain at least one digit';
    } else if (!/[!@#$%^&*]/.test(formData.newPassword)) {
      newErrors.newPassword = 'Password must contain at least one special character';
    }

    // Validate confirm password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirm password is required';
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    console.log('Validation Errors:', newErrors); // Debugging line
    setErrors(newErrors);
    console.log('Errors State:', errors); // Debugging line
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted'); // Debugging line

    // Validate the form
    const isValid = validateForm();
    console.log('Is Form Valid?', isValid); // Debugging line

    if (!isValid) {
      console.log('Form is invalid'); // Debugging line
      return; // Stop submission if there are errors
    }

    console.log('Form is valid, submitting...'); // Debugging line

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.newPassword,
      });
      localStorage.setItem('auth_token', response.data.token);

      // Handle successful registration
      Swal.fire({
        icon: 'success',
        title: 'Registration Successful',
        text: 'You have successfully registered',
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = '/'; // Redirect to the desired URL
        }
      });
    } catch (error) {
      // Handle registration error
      const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: errorMessage,
      });
    }
  };

  return (
    <div className="container-fluid mt-5 pt-5 d-flex justify-content-center align-items-center">
      <div className="card w-50">
        <div className="card-body">
          <div className="row">
            {/* Image Column */}
            <div className="col">
              <img
                src={img1}
                alt="login"
                className="image-fluid"
                style={{ maxWidth: '100%', height: '' }}
              />
            </div>

            {/* Form Column */}
            <div className="col my-auto">
              <h2 className="card-title text-center">
                Welcome to the world of <br />
                <span className="text-primary">Aqua</span> <span style={{ color: '#FF3D00' }}>Overseas!</span>
              </h2>
              <form onSubmit={handleSubmit}>
                {/* Name Field */}
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control rounded-pill"
                    placeholder="Name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {errors.name && <div className="text-danger">{errors.name}</div>}
                </div>

                {/* Email Field */}
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control rounded-pill"
                    placeholder="Email-id"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && <div className="text-danger">{errors.email}</div>}
                </div>

                {/* Phone Field */}
                <div className="mb-3">
                  <input
                    type="tel"
                    className="form-control rounded-pill"
                    placeholder="Contact Number"
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  {errors.phone && <div className="text-danger">{errors.phone}</div>}
                </div>

                {/* New Password Field */}
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control rounded-pill"
                    placeholder="New Password"
                    id="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                  />
                  {errors.newPassword && <div className="text-danger">{errors.newPassword}</div>}
                </div>

                {/* Confirm Password Field */}
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control rounded-pill"
                    placeholder="Confirm Password"
                    id="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  {errors.confirmPassword && <div className="text-danger">{errors.confirmPassword}</div>}
                </div>

                <button type="submit" className="btn btn-primary w-50 rounded-pill mx-auto d-block">
                  Sign Up
                </button>
                <div className="text-center float-end">
                <Link to="/signin" className="text-decoration-none">
                  Already have an account?
                </Link>
              </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;