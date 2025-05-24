import React, { useContext } from "react";
import { Container,Row,Col} from "react-bootstrap";
import ProductCard from "./ProductCard";
import { useState,useEffect } from "react";
import { CarritoContext } from "../context/CarritoContext";

function ProductList({title,category=null}){
    const {cart,addToCart} = useContext(CarritoContext);

    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        let url = 'https://fakestoreapi.com/products';

        if (category){
            url = `https://fakestoreapi.com/products/category/${category}`;
        }

        setCargando(true);
        setError(null);

        fetch(url)
        .then((res) => {
            if (!res.ok) throw new Error('Error al cargar productos');
            return res.json();
        })
        .then((data) => {
            setProductos(data);
            setCargando(false);
        })
        .catch((err) => {
            console.error(err);
            setError('No se pudieron cargar los productos.');
            setCargando(false);
        });
    }, [category]);

    return(
        <Container className="mt-4">
        <h1 className="mb-3">{title}</h1>
        <hr style={{ borderTop: "1px solid #ccc", opacity: 0.5 }} />
        {cargando && <p>Cargando productos...</p>}
        {error && <p>{error}</p>}
        {!cargando && !error && (
        
            <Row xs={1} md={2} lg={4} className="g-4">
                {productos.map((producto) => (
                <Col key={producto.id}>
                    <ProductCard producto={producto} addToCart={addToCart}/>
                </Col>
                ))}
                
            </Row>
        )}
    </Container>);
}

export default ProductList;