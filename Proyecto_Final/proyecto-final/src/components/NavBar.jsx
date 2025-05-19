import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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
                    <Nav className="ms-auto d-flex align-items-center gap-2 text-white">
                        {isLogued ? (
                            <>
                                <Nav.Link as={Link} to="/carrito" className="text-white">🛒 Carrito</Nav.Link>
                                {isAuthenticated && (
                                    <Nav.Link as={Link} to="/admin" className="text-white">🛡️ Admin</Nav.Link>
                                )}
                                <span className="navbar-text">Usuario: {username}</span>
                                <Button variant="info" size="sm" onClick={cerrarSesion}>
                                    Cerrar Sesión
                                </Button>
                            </>
                        ) : (
                            <Button as={Link} to="/login" variant="info" size="sm">
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
