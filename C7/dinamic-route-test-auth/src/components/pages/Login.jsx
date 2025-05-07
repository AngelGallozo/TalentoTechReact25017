import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import users from './users.json';
import {toast } from 'react-toastify';

function Login({ setLogin, setAuth, setUsername }) {
    const [user, setUser] = useState('');
    const [password, setPass] = useState('');
    const navigate = useNavigate();

    function manejarLogin(evento) {
        evento.preventDefault();
    
        const foundUser = users.find(
            (u) => u.user === user && u.password === password
        );
    
        if (foundUser) {
            setLogin(true);
            setUsername(foundUser.user);
    
            if (foundUser.type === "admin") {
                setAuth(true);
            }
    
            toast.success(`Bienvenido ${foundUser.user}`, {
                position: "top-center",
                autoClose: 2000,
                closeButton: false,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
    
            navigate('/'); // Podrías usar navigate('/admin') si es admin, por ejemplo.
        } else {
            toast.error(`Usuario o contraseña inválida.`, {
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
    }
    

    return (
        <div className="d-flex justify-content-center align-items-center">
            <div className="border p-4 rounded shadow bg-white">
                <h1 className="text-center mb-4">Inicio de Sesión</h1>
                <form onSubmit={manejarLogin}>
                    <div className="form-group mb-3">
                        <label htmlFor="inputUser">Nombre de Usuario</label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputUser"
                            value={user}
                            onChange={(e) => setUser(e.target.value)}
                            placeholder="Ingrese nombre de usuario"
                        />
                    </div>
                    <div className="form-group mb-4">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPass(e.target.value)}
                            placeholder="Ingrese contraseña"
                        />
                    </div>

                    <button type="submit" className="btn btn-primary w-100">
                        Ingresar
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
