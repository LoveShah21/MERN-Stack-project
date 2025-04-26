import React, { useEffect, useState } from 'react';
import { getCurrentUser, updateUserData } from '../utils/api'; // Assume updateUserData is a new API function
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [errors, setErrors] = useState({}); // State to store validation errors

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getCurrentUser(); // Await the API call

        // Check if data is defined
        if (!userData) {
          throw new Error('No user data returned from the API');
        }

        // Safely set user state
        setUser({
          name: userData.name || '',
          lastName: userData.lastName || '',
          email: userData.email || '',
          currentPassword: '',
          newPassword: '',
          confirmNewPassword: '',
        });
      } catch (error) {
        console.error('Failed to fetch user:', error);
        navigate('/signin'); // Redirect to login page on error
      }
    };

    fetchUser();
  }, [navigate]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [id]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [id]: '' })); // Clear error on change
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate current password
    if (!user.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }

    // Validate new password
    if (!user.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (user.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters long';
    } else if (!/[A-Z]/.test(user.newPassword)) {
      newErrors.newPassword = 'Password must contain at least one uppercase letter';
    } else if (!/[!@#$%^&*]/.test(user.newPassword)) {
      newErrors.newPassword = 'Password must contain at least one special character';
    }

    // Validate confirm new password
    if (user.newPassword !== user.confirmNewPassword) {
      newErrors.confirmNewPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // Stop if validation fails
    }

    try {
      const response = await updateUserData({
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        currentPassword: user.currentPassword,
        newPassword: user.newPassword,
      });

      if(response.passInCorrect){
        alert('Your current password is incorrect');
      }

      if (response.success) {
        alert('Profile updated successfully!');
        navigate('/profile/dashboard'); // Redirect to profile page
      } else {
        alert(response.message || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating user:', error);
      alert('An error occurred while updating your profile');
    }
  };

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col mb-4" style={{ width: '80%' }}>
          <h3>Edit Your Profile</h3>
          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <div className="col">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control shadow-sm rounded-1 border"
                  id="name"
                  value={user.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                />
              </div>
              <div className="col">
                <label htmlFor="name" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  className="form-control shadow-sm rounded-1 border"
                  id="lastName"
                  value={user.lastName}
                  onChange={handleChange}
                  placeholder="Enter your name"
                />
              </div>
            </div>

            <div className="row mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control shadow-sm rounded-1 border"
                id="email"
                value={user.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="currentPassword" className="form-label">
                Current Password
              </label>
              <input
                type="password"
                className="form-control shadow-sm rounded-1 border"
                id="currentPassword"
                value={user.currentPassword}
                onChange={handleChange}
              />
              {errors.currentPassword && (
                <div className="text-danger">{errors.currentPassword}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="newPassword" className="form-label">
                New Password
              </label>
              <input
                type="password"
                className="form-control shadow-sm rounded-1 border"
                id="newPassword"
                value={user.newPassword}
                onChange={handleChange}
              />
              {errors.newPassword && (
                <div className="text-danger">{errors.newPassword}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="confirmNewPassword" className="form-label">
                Confirm New Password
              </label>
              <input
                type="password"
                className="form-control shadow-sm rounded-1 border"
                id="confirmNewPassword"
                value={user.confirmNewPassword}
                onChange={handleChange}
              />
              {errors.confirmNewPassword && (
                <div className="text-danger">{errors.confirmNewPassword}</div>
              )}
            </div>

            <div className="d-flex gap-3 justify-content-end">
              <button type="submit" className="btn rounded-1" style={{ background: '#E40705', color: 'white' }}>
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;