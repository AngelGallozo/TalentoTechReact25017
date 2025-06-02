// ProductList.js
import React, { useContext } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import ProductCard from "./ProductCard";
import { CarritoContext } from "../context/CarritoContext";
import { ProductsContext } from "../context/ProductsContext";

function ProductList({ title, category = null }) {
    const { addToCart } = useContext(CarritoContext);
    const { productos, cargando, error } = useContext(ProductsContext);

    // Filtrar productos por categoría (solo en el componente, ya que todos se cargan una vez)
    const productosFiltrados = category
        ? productos.filter((p) => p.category === category)
        : productos;

    return (
        <Container className="mt-4">
            <h1 className="mb-3">{title}</h1>
            <hr style={{ borderTop: "1px solid #ccc", opacity: 0.5 }} />

            {cargando && (
                <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: "150px" }}>
                    <Spinner animation="border" role="status" variant="primary" style={{ width: "4rem", height: "4rem" }} />
                    <span className="mt-2">Cargando productos...</span>
                </div>
            )}

            {error && <p className="text-danger">{error}</p>}

            {!cargando && !error && (
                <Row xs={1} md={2} lg={4} className="g-4">
                    {productosFiltrados.map((producto) => (
                        <Col key={`${producto.id}-${producto.title}`}>
                            <ProductCard producto={producto} addToCart={addToCart} />
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
}

export default ProductList;
