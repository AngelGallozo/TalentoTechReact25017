import React, { useContext } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart} from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../context/AuthContext';
import { useSearch } from "../context/SearchContext";
import { Form, FormControl } from "react-bootstrap";
import { CarritoContext } from "../context/CarritoContext";


function NavBar() {
    const { cart } = useContext(CarritoContext);
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

    const navigate = useNavigate();
    const {deleteToken} = useContext(AuthContext);
    const { busqueda, setBusqueda } = useSearch();

    const token = localStorage.getItem('authToken')
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    const username = localStorage.getItem('username') || '';

    const cerrarSesion = () => {
        deleteToken();
        localStorage.setItem('isAdmin', 'false');
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
                        {token ? (
                            <> 
                                <Form className="d-flex align-items-center" style={{ maxWidth: "200px" }}>
                                    <Form.Control
                                        type="search"
                                        placeholder="Buscar productos..."
                                        className="me-2"
                                        value={busqueda}
                                        onChange={(e) => setBusqueda(e.target.value)}
                                    />
                                </Form>
                                <span className="navbar-text text-white">{username}</span>
                                <Nav.Link as={Link} to="/carrito" className="position-relative text-white">
                                    <FontAwesomeIcon icon={faShoppingCart} size="lg" />
                                    {totalItems > 0 && (
                                        <span className="cart-badge">
                                            {totalItems}
                                        </span>
                                    )}
                                </Nav.Link>
                                {isAdmin && (
                                    <Nav.Link as={Link} to="/admin" className="text-white border border-white rounded px-2 py-1">Administración</Nav.Link>
                                )}
                                <Button variant="info" size="sm"  className="text-white" onClick={cerrarSesion} aria-label="Cerrar sesion">
                                    Cerrar Sesión
                                </Button>
                            </>
                        ) : (
                            <Button as={Link} to="/login" variant="info" size="sm" className="text-white" aria-label="Iniciar sesion">
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
