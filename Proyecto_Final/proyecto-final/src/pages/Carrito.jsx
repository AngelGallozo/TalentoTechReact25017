import React, { useContext } from "react";
import { CarritoContext } from "../context/CarritoContext";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { Helmet } from "react-helmet-async";

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
                <meta name="description" content="Comunícate con nosotros." />
            </Helmet>

            <Container className="mt-4">
                <h1 className="mb-4 text-center">Carrito de Compras</h1>
                <hr />

                {cart.length === 0 ? (
                    <p className="text-center">El carrito está vacío.</p>
                ) : (
                    <>
                        {/* Encabezado tipo tabla solo en pantallas medianas o más grandes */}
                        <Row className="fw-bold border-bottom pb-2 mb-2 d-none d-sm-flex">
                            <Col sm={4}>Producto</Col>
                            <Col sm={2}>Cantidad</Col>
                            <Col sm={2}>Precio Unitario</Col>
                            <Col sm={2}>Subtotal</Col>
                            <Col sm={2}>Acciones</Col>
                        </Row>

                        {cart.map((producto) => (
                            <Row key={producto.id} className="align-items-center mb-4 pb-3 border-bottom border-3 border-dark-subtle">
                                {/* Vista para pantallas pequeñas */}
                                <Col xs={12} className="d-block d-sm-none">
                                    <p><strong>Producto:</strong> {producto.title}</p>
                                    <p><strong>Cantidad:</strong></p>
                                    <Form.Control
                                        type="number"
                                        min="1"
                                        value={producto.quantity}
                                        onChange={(e) => handleQuantityChange(producto.id, e.target.value)}
                                    />
                                    <p className="mt-2"><strong>Precio Unitario:</strong> ${producto.price.toFixed(2)}</p>
                                    <p><strong>Subtotal:</strong> ${(producto.price * producto.quantity).toFixed(2)}</p>
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        onClick={() => removeFromCart(producto.id)}
                                        aria-label="Eliminar producto del carrito"
                                    >
                                        Eliminar
                                    </Button>
                                </Col>

                                {/* Vista para pantallas medianas y grandes */}
                                <Col sm={4} className="d-none d-sm-block">{producto.title}</Col>
                                <Col sm={2} className="d-none d-sm-block">
                                    <Form.Control
                                        type="number"
                                        min="1"
                                        value={producto.quantity}
                                        onChange={(e) => handleQuantityChange(producto.id, e.target.value)}
                                    />
                                </Col>
                                <Col sm={2} className="d-none d-sm-block">${producto.price.toFixed(2)}</Col>
                                <Col sm={2} className="d-none d-sm-block">
                                    ${(producto.price * producto.quantity).toFixed(2)}
                                </Col>
                                <Col sm={2} className="d-none d-sm-block">
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

                        <Row className="border-top pt-3 mt-4 fw-bold">
                            <Col xs={6} sm={{ span: 2, offset: 8 }}>Total:</Col>
                            <Col xs={6} sm={2}>${total.toFixed(2)}</Col>
                        </Row>

                        <Row className="mt-4">
                            <Col
                                xs={12}
                                sm={6}
                                className="mb-2 mb-sm-0 d-flex justify-content-sm-start justify-content-center"
                            >
                                <Button
                                variant="warning"
                                onClick={cleanCart}
                                className="btn-responsive w-md-auto px-4 py-2"
                                aria-label="Limpiar el carrito"
                                >
                                Limpiar carrito
                                </Button>
                            </Col>
                            <Col
                                xs={12}
                                sm={6}
                                className="d-flex justify-content-sm-end justify-content-center"
                            >
                                <Button
                                variant="success"
                                className="btn-responsive w-md-auto px-4 py-2"
                                aria-label="Ir a pagar"
                                >
                                Ir a pagar
                                </Button>
                            </Col>
                        </Row>
                    </>
                )}
            </Container>
        </>
    );
}

export default Carrito;
