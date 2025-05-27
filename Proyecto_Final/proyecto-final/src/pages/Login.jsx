import React, { useState,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import users from '../users.json';
import {toast } from 'react-toastify';
import {Form, Button, Container, Row, Col, Card} from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';

function Login() {
    const [user, setUser] = useState('');
    const [password, setPass] = useState('');
    const navigate = useNavigate();
    const {createToken} = useContext(AuthContext);

    function manejarLogin(evento) {
        evento.preventDefault();
    
        const foundUser = users.find(
            (u) => u.user === user && u.password === password
        );
    
        if (foundUser) {
            createToken(foundUser.user);
            localStorage.setItem('username',foundUser.user);
    
            if (foundUser.type === "admin") {
                localStorage.setItem('isAdmin','true');
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
    
            navigate('/');
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
        <Container className="d-flex justify-content-center align-items-center h-100">
            <Row className="w-100 justify-content-center">
                <Col md={6} lg={4}>
                    <Card className="shadow-lg p-4">
                        <Card.Body>
                            <h2 className="text-center mb-4">Iniciar Sesión</h2>
                            <Form onSubmit={manejarLogin}>
                                <Form.Group className="mb-3" controlId="formUsername">
                                    <Form.Label>Usuario</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Ingrese nombre de usuario"
                                        value={user}
                                        onChange={(e) => setUser(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formPassword">
                                    <Form.Label>Contraseña</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Ingrese contraseña"
                                        value={password}
                                        onChange={(e) => setPass(e.target.value)}
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit" className="w-100">
                                    Ingresar
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );

}

export default Login;
