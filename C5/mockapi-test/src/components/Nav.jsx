import React from 'react';

function Nav() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary p-2">
            <a className="navbar-brand" href="#">Mi Tienda Online</a>
            <div className="collapse navbar-collapse">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item"><a className="nav-link" href="#">Inicio</a></li>
                    <li className="nav-item"><a className="nav-link" href="#">Acerca de</a></li>
                    <li className="nav-item"><a className="nav-link" href="#">Contacto</a></li>
                </ul>
            </div>
        </nav>
    );
}

export default Nav;
