import React, { useContext, useState, useEffect } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import ProductCard from "./ProductCard";
import { CarritoContext } from "../context/CarritoContext";

function ProductList({ title, category = null }) {
    const { addToCart } = useContext(CarritoContext);

    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProductos = async () => {
            setCargando(true);
            setError(null);

            try {
                // 1. Obtener productos de FakeStore
                const resFake = await fetch("https://fakestoreapi.com/products");
                if (!resFake.ok) throw new Error("Error al cargar productos de FakeStore");
                const productosFake = await resFake.json();

                // 2. Obtener productos de MockAPI
                const resMock = await fetch("https://67eaf4ae34bcedd95f651d8e.mockapi.io/api/products");
                if (!resMock.ok) throw new Error("Error al cargar productos de MockAPI");
                let productosMock = await resMock.json();

                // 3. Si hay categoría, filtrarla solo en MockAPI
                if (category) {
                    productosMock = productosMock.filter(p => p.category === category);
                }

                // 4. Unir ambos arrays
                const productosCombinados = [...productosFake, ...productosMock];

                setProductos(productosCombinados);
            } catch (err) {
                console.error(err);
                setError("No se pudieron cargar los productos.");
            } finally {
                setCargando(false);
            }
        };

        fetchProductos();
    }, [category]);

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
                    {productos.map((producto) => (
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
