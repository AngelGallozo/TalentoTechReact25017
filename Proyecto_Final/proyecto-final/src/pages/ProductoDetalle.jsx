import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Badge, Spinner, Alert, Button, Form } from "react-bootstrap";
import { CarritoContext } from "../context/CarritoContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

function ProductoDetalle() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [cantidad, setCantidad] = useState(1);

  const { addToCart } = useContext(CarritoContext);

useEffect(() => {
  setCargando(true);

  fetch(`https://fakestoreapi.com/products/${id}`)
    .then((res) => {
      if (!res.ok) throw new Error("Error al obtener el producto");
      return res.json();
    })
    .then((data) => {
      setProducto(data);
      setCargando(false);
    })
    .catch((err) => {
      console.warn("Error en API principal, probando MockAPI...", err);

      fetch(`https://67eaf4ae34bcedd95f651d8e.mockapi.io/api/products`)
        .then((res) => {
          if (!res.ok) throw new Error("Error al obtener datos de MockAPI");
          return res.json();
        })
        .then((data) => {
          const productoMock = data.find((prod) => String(prod.id) === id);
          if (!productoMock) {
            throw new Error("Producto no encontrado en MockAPI");
          }
          setProducto(productoMock);
          setError(null);
        })
        .catch((err2) => {
          console.error(err2);
          setError("Producto no encontrado.");
        })
        .finally(() => setCargando(false));
    });
}, [id]);



  if (cargando)
    return (
      <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: "150px" }}>
        <Spinner
          animation="border"
          role="status"
          variant="primary"
          style={{ width: "4rem", height: "4rem" }}
        />
        <span className="mt-2">Cargando producto...</span>
      </div>
    );

  if (error) return <Alert variant="danger" className="m-4">{error}</Alert>;
  if (!producto) return null;

  return (
    <Container className="my-4">
      <Row>
        <Col md={5} className="text-center mb-4">
          <img
            src={producto.image}
            alt={producto.title}
            style={{ maxWidth: "100%", maxHeight: "400px", objectFit: "contain" }}
          />
        </Col>
        <Col md={7}>
          <h2>{producto.title}</h2>
          <h4 className="text-success">${producto.price}</h4>
          <p><strong>Categoría:</strong> <Badge bg="info" text="dark">{producto.category}</Badge></p>
          <p><strong>Descripción:</strong> {producto.description}</p>
          <p><strong>Valoración:</strong> {producto.rating?.rate} ⭐ ({producto.rating?.count} opiniones)</p>

          <Form.Group className="my-3 d-flex align-items-center gap-2" controlId="cantidadInput">
            <Form.Label className="mb-0">Cantidad:</Form.Label>
            <Form.Control
              type="number"
              min={1}
              value={cantidad}
              onChange={(e) => setCantidad(parseInt(e.target.value) || 1)}
              style={{ width: "100px" }}
            />
          </Form.Group>
          <Button
            variant="primary"
            onClick={() => addToCart(producto, cantidad)}
          >
            <FontAwesomeIcon icon={faShoppingCart} size="lg" /> Agregar al carrito
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductoDetalle;
