// ProductList.js
import React, { useContext, useState, useEffect  } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import ProductCard from "./ProductCard";
import { CarritoContext } from "../context/CarritoContext";
import { ProductsContext } from "../context/ProductsContext";
import {Helmet} from "react-helmet-async";
import { useSearch } from "../context/SearchContext";

function ProductList({ title, category = null }) {
    const productosPorPagina = 4;
    const [paginaActual, setPaginaActual] = useState(1);
    
    const { busqueda } = useSearch();
    const { addToCart } = useContext(CarritoContext);
    const { productos, cargando, error } = useContext(ProductsContext);

    useEffect(() => {
        setPaginaActual(1);
    }, [category, busqueda]);

    // Filtrar productos por categoría (solo en el componente, ya que todos se cargan una vez)
    let productosFiltrados = category
        ? productos.filter((p) => p.category === category)
        : productos;

    if (busqueda.trim() !== "") {
        productosFiltrados = productosFiltrados.filter((p) =>
        p.title.toLowerCase().includes(busqueda.toLowerCase())
        );
    }

    // Calcular productos para la página actual
    const indiceUltimoProducto = paginaActual * productosPorPagina;
    const indicePrimerProducto = indiceUltimoProducto - productosPorPagina;
    const productosActuales = productosFiltrados.slice(indicePrimerProducto, indiceUltimoProducto);

    // Calcular cantidad total de páginas
    const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);

    // Cambiar de página
    const irAPagina = (numero) => {
        setPaginaActual(numero);
    };

    useEffect(() => {
        if (paginaActual > totalPaginas) {
            setPaginaActual(totalPaginas || 1);
        }
    }, [totalPaginas, paginaActual]);


    return (
        <>
            <Helmet>
                <title>Productos | Mi Tienda Online</title>
                <meta name="description" content="Explora nuestra variedad de productos."/>
            </Helmet>
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
                        {productosActuales.map((producto) => (
                            <Col key={`${producto.id}-${producto.title}`}>
                                <ProductCard producto={producto} addToCart={addToCart} />
                            </Col>
                        ))}
                    </Row>
                )}
                {!cargando && !error && totalPaginas > 1 && (
                    <div className="d-flex justify-content-center mt-4">
                        <nav>
                            <ul className="pagination">
                                {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((numero) => (
                                    <li
                                        key={numero}
                                        className={`page-item ${numero === paginaActual ? "active" : ""}`}
                                        onClick={() => irAPagina(numero)}
                                        style={{ cursor: "pointer" }}
                                    >
                                        <span className="page-link">{numero}</span>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                )}
            </Container>
        </>
        
    );
}

export default ProductList;
