import React from "react";
import { Navigate, useLocation } from "react-router-dom";

function RutaProtegida({ children }) {
    const location = useLocation();
    const isLogued = localStorage.getItem('logued') === 'true';
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

    if (!isLogued) {
        return <Navigate to="/login" replace />;
    }

    if (location.pathname === "/admin" && !isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return children;
}

export default RutaProtegida;
