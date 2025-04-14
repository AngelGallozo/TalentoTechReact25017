import React from 'react';
import TarjetaProducto from './TarjetaProducto';
import { useState } from "react";
import { useEffect } from 'react';
import Carrito from './Carrito';
function Main() {  
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetch('https://67eaf4ae34bcedd95f651d8e.mockapi.io/productos/productos')
            .then((respuesta) => {
                if (!respuesta.ok) {
                    throw new Error('Error al obtener los productos. Código: ' + respuesta.status);
                }
                return respuesta.json();
            })
            .then((datos) => {
                setProductos(datos);
                setCargando(false);
            })
            .catch((error) => {
                console.error(error); // para depurar
                setError('Error al cargar los productos. Inténtelo más tarde.');
                setCargando(false);
            });
    }, []);
    


    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.id === product.id);
        
            if (existingItem) {
                return prevCart.map((item) =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                return [...prevCart, { ...product, quantity: 1 }];
            }
            });
    };

    const removeFromCart = (productId) => {
        setCart(cart.filter((item) => item.id !== productId));
    };
    
    const cleanCart = ()=>{
        setCart([]);
    }

    return (  
        <main>  
            <h2>Productos disponibles:</h2>  
            {cargando && <p>Cargando productos...</p>}
            {error && <p>{error}</p>}

            {!cargando && !error && (
                <div className='list-products'>
                    {productos.map((producto, index) => (
                        <TarjetaProducto 
                            producto={producto} 
                            key={index} 
                            addToCart={addToCart} 
                        />
                    ))}
                </div>
            )}
            
            <Carrito cart={cart} removeFromCart={removeFromCart} cleanCart={cleanCart}></Carrito>
        </main>  
    );  
}  
export default Main; 