import React from 'react';
import { Link } from 'react-router-dom';

function Nav() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary p-2">
            <a className="navbar-brand" href="#">Mi Tienda Online</a>
            <div className="collapse navbar-collapse">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item"><Link className="nav-link" to="/">Inicio</Link></li>
                    <li className="nav-item"><Link className="nav-link" to="/about">Acerca de</Link></li>
                    <li className="nav-item"><Link className="nav-link" to="/contacto">Contacto</Link></li>
                </ul>
            </div>
        </nav>
    );
}

export default Nav;
