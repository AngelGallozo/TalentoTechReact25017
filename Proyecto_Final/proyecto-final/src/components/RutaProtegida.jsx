import React from "react";
import { Navigate, useLocation } from "react-router-dom";

function RutaProtegida({ children }) {
    const location = useLocation();
    const token = localStorage.getItem('authToken');
    const isAdmin = localStorage.getItem('isAdmin') === 'true';

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    if (location.pathname === "/admin" && !isAdmin) {
        return <Navigate to="/" replace />;
    }

    return children;
}

export default RutaProtegida;
