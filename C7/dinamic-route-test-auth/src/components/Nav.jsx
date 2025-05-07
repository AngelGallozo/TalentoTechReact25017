import React from 'react';
import { Link, useNavigate} from 'react-router-dom';
import { toast } from "react-toastify";

function Nav({ isLogued, username, setLogin, setAuth, setUsername }) {
    const navigate = useNavigate();

    const cerrarSesion = () => {
        setLogin(false);
        setAuth(false);
        setUsername('');
        toast.success(`Sesión cerrada con éxito.`, {
                        position: "top-center",
                        autoClose: 2000,
                        closeButton: false,
                        hideProgressBar: true,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
        navigate('/'); // Redirige al inicio
    };
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary p-2">
            <a className="navbar-brand" href="#">Mi Tienda Online</a>
            <div className="collapse navbar-collapse">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item"><Link className="nav-link" to="/">Inicio</Link></li>
                    <li className="nav-item"><Link className="nav-link" to="/about">Acerca de</Link></li>
                    <li className="nav-item"><Link className="nav-link" to="/contacto">Contacto</Link></li>
                    <li className="nav-item"><Link className="nav-link" to="/carrito">🛒 Carrito</Link></li>
                    <li className="nav-item"><Link className="nav-link" to="/admin">🛡️ Admin</Link></li>
                </ul>
            </div>
            <div className="Login text-white ms-auto d-flex align-items-center gap-2">
                {isLogued ? (
                    <>
                        <p className="mb-0">Usuario: {username}</p>
                        <button className="btn btn-info" onClick={cerrarSesion}>
                            Cerrar Sesión
                        </button>
                    </>
                ) : (
                    <Link className="btn btn-info" to="/login">Iniciar Sesión</Link>
                )}
            </div>
        </nav>
    );
}

export default Nav;
