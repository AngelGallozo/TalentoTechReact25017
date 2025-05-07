import React, { useRef } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

function RutaProtegida({ isLogued, isAuthenticated, children }) {
    const location = useLocation();
    const toastShown = useRef(false); // para evitar múltiples toasts

    if (!isLogued) {
        if (!toastShown.current) {
            toastShown.current = true; // marcar que ya se mostró
            toast.info(`Inicia sesión primero.`, {
                position: "top-center",
                autoClose: 2000,
                closeButton: false,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

        return <Navigate to="/login" replace />;
    }

    if (location.pathname === "/admin" && !isAuthenticated) {
        if (!toastShown.current) {
            toastShown.current = true; // marcar que ya se mostró
            toast.error(`Usuario sin permisos`, {
                position: "top-center",
                autoClose: 2000,
                closeButton: false,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        return <Navigate to="/" replace />;
    }

    return children;
}

export default RutaProtegida;
