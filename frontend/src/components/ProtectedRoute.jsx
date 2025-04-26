// ProtectedRoute.js
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = ({ roleRequired }) => {
    const user = localStorage.getItem('user');
    const userRole = localStorage.getItem('role'); // e.g., 'admin', 'editor', 'user'

    if (!user) {
        // If the user is not logged in, redirect to the login page
        return <Navigate to="/entry" />;
    }

    if (roleRequired && userRole !== roleRequired) {
        // If the user's role doesn't match the required role, redirect to home or unauthorized page
        alert('access denied: Only admins allowed');
        return <Navigate to="/" />;
    }

    return <Outlet />;
};