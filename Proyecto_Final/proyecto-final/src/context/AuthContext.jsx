import React, { createContext, useState } from 'react';
// Crear el contexto de autenticación
export const AuthContext = createContext();
// Proveedor del contexto
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);


    const createToken = (username) => {
        // Simulando la creación de un token (en una app real, esto sería generado por un servidor)
        const token = `fake-token-${username}`;
        localStorage.setItem('authToken', token);
        setUser(username);
    };
    const deleteToken = () => {
        localStorage.removeItem('authToken');
        setUser(null);
    };
    return (
        <AuthContext.Provider value={{ user, createToken, deleteToken }}>
            {children}
        </AuthContext.Provider> );
}

