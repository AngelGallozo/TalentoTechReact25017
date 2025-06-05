import React, { useContext } from "react";
import { CarritoContext } from "../context/CarritoContext";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import {Helmet} from "react-helmet-async";

function Carrito() {
    const { cart, cleanCart, removeFromCart, updateQuantity } = useContext(CarritoContext);

    const total = cart.reduce(
        (acc, producto) => acc + producto.price * producto.quantity,
        0
    );

    const handleQuantityChange = (id, newQuantity) => {
        const qty = Math.max(1, parseInt(newQuantity) || 1);
        updateQuantity(id, qty);
    };

    return (
        <>
            <Helmet>
                <title>Carrito | Mi Tienda Online</title>
                <meta name="description" content="Comunícate con nosotros."/>
            </Helmet>
            <Container className="mt-4">
            <h1 className="mb-4 text-center">Carrito de Compras</h1>
            <hr />

            {cart.length === 0 ? (
                <p className="text-center">El carrito está vacío.</p>
            ) : (
                <>
                {/* Encabezado tipo tabla */}
                <Row className="fw-bold border-bottom pb-2 mb-2">
                    <Col sm={4}>Producto</Col>
                    <Col sm={2}>Cantidad</Col>
                    <Col sm={2}>Precio Unitario</Col>
                    <Col sm={2}>Subtotal</Col>
                    <Col sm={2}>Acciones</Col>
                </Row>

                {/* Lista de productos */}
                {cart.map((producto) => (
                    <Row key={producto.id} className="align-items-center mb-2">
                    <Col sm={4}>{producto.title}</Col>
                    <Col sm={2}>
                        <Form.Control
                        type="number"
                        min="1"
                        value={producto.quantity}
                        onChange={(e) =>
                            handleQuantityChange(producto.id, e.target.value)
                        }
                        />
                    </Col>
                    <Col sm={2}>${producto.price.toFixed(2)}</Col>
                    <Col sm={2}>
                        ${(producto.price * producto.quantity).toFixed(2)}
                    </Col>
                    <Col sm={2}>
                        <Button
                        variant="danger"
                        size="sm"
                        onClick={() => removeFromCart(producto.id)}
                        >
                        Eliminar
                        </Button>
                    </Col>
                    </Row>
                ))}

                {/* Total */}
                <Row className="border-top pt-3 mt-4 fw-bold">
                    <Col sm={{ span: 2, offset: 8 }}>Total:</Col>
                    <Col sm={2}>${total.toFixed(2)}</Col>
                </Row>

                {/* Botones */}
                <Row className="mt-4">
                    <Col sm={6}>
                    <Button variant="warning" onClick={cleanCart}>
                        Limpiar carrito
                    </Button>
                    </Col>
                    <Col sm={6} className="text-end">
                    <Button variant="success">Ir a pagar</Button>
                    </Col>
                </Row>
                </>
            )}
            </Container>
        </>
    );
    }

export default Carrito;
