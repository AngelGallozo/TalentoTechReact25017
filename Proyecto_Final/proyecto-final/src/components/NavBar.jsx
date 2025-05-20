import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faShieldAlt } from '@fortawesome/free-solid-svg-icons';


function NavBar() {
    const navigate = useNavigate();

    const isLogued = localStorage.getItem('logued') === 'true';
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'; // 👈 nueva línea
    const username = localStorage.getItem('username') || '';

    const cerrarSesion = () => {
        localStorage.setItem('logued', 'false');
        localStorage.setItem('isAuthenticated', 'false'); // 👈 asegurate de resetearlo también
        localStorage.removeItem('username');
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
        navigate('/');
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">Mi Tienda Online</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-nav" />
                <Navbar.Collapse id="navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Inicio</Nav.Link>
                        <Nav.Link as={Link} to="/about">Sobre Nosotros</Nav.Link>
                        <Nav.Link as={Link} to="/contact">Contacto</Nav.Link>
                    </Nav>

                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/hombres">Hombres</Nav.Link>
                        <Nav.Link as={Link} to="/mujeres">Mujeres</Nav.Link>
                        <Nav.Link as={Link} to="/joyeria">Joyería</Nav.Link>
                        <Nav.Link as={Link} to="/electronica">Electrónica</Nav.Link>
                    </Nav>

                    <Nav className="ms-auto d-flex align-items-center gap-2 text-white">
                        {isLogued ? (
                            <>
                                <span className="navbar-text text-white">{username}</span>
                                <Nav.Link as={Link} to="/carrito" className="text-white">
                                    <FontAwesomeIcon icon={faShoppingCart} /></Nav.Link>
                                {isAuthenticated && (
                                    <Nav.Link as={Link} to="/admin" className="text-white border border-white rounded px-2 py-1">Administración</Nav.Link>
                                )}
                                <Button variant="info" size="sm"  className="text-white" onClick={cerrarSesion}>
                                    Cerrar Sesión
                                </Button>
                            </>
                        ) : (
                            <Button as={Link} to="/login" variant="info" size="sm" className="text-white">
                                Iniciar Sesión
                            </Button>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;
