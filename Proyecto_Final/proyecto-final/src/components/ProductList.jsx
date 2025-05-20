import React from "react";
import { Container,Row,Col} from "react-bootstrap";
import ProductCard from "./ProductCard";
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ProductList({setCart,title,category=null}){
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const isLogued = localStorage.getItem('logued') ==='true';
    
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

    const addToCart = (product) => {
        if (isLogued) {
            setCart((prevCart) => {
                const existingItem = prevCart.find((item) => item.id === product.id);

                if (existingItem) {
                return prevCart.map((item) =>
                    item.id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
                );
                } else {
                return [...prevCart, { ...product, quantity: 1 }];
                }
            });

            toast.success(`${product.title} agregado al carrito`, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            navigate("/login", { replace: true });
        }
    };

    return(
        <Container className="mt-4">
        <h1>{title}</h1>
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