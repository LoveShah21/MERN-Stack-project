import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api/auth" });

// Add token to request headers
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("auth_token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const getCurrentUser = async () => {
  const token = localStorage.getItem('auth_token');
  if (!token) {
    throw new Error('No token found');
  }

  try {
    const response = await API.get('/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Ensure this returns the user data
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error; // Re-throw the error to handle it in the component
  }
};

export const updateUserData = async (userData) => {
  const token = localStorage.getItem('auth_token');
  if (!token) {
    throw new Error('No token found');
  }

  try {
    const response = await API.put('/update', userData, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the auth token
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};