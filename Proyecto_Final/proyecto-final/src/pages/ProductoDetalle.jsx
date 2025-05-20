import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Badge, Spinner, Alert } from "react-bootstrap";

function ProductoDetalle() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

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
      console.error(err);
      setError("Producto no encontrado.");
      setCargando(false);
    });
  }, [id]);

  if (cargando) return <Spinner animation="border" className="m-4" />;
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
      </Col>
      </Row>
    </Container>
  );
}

export default ProductoDetalle;