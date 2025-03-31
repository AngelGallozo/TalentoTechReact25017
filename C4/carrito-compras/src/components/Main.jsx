import React from 'react';
import TarjetaProducto from './TarjetaProducto';
import { useState } from "react";
import Carrito from './Carrito';
function Main() {  
    const productos = [
        { id:1, nombre: 'Zapatillas', precio: '$55.000', imagen: 'https://cdn-icons-png.freepik.com/512/8787/8787075.png' },
        { id:2, nombre: 'Campera', precio: '$70.000', imagen: 'https://cdn-icons-png.freepik.com/512/8787/8787075.png' },
        { id:3, nombre: 'Remera', precio: '$30.000', imagen: 'https://cdn-icons-png.freepik.com/512/8787/8787075.png' },
        { id:4, nombre: 'Pc gamer', precio: '$340.000', imagen: 'https://cdn-icons-png.freepik.com/512/8787/8787075.png' },
        { id:5, nombre: 'Auriculares', precio: '$80.000', imagen: 'https://cdn-icons-png.freepik.com/512/8787/8787075.png' },
        { id:6, nombre: 'Notebook', precio: '$1.200.000', imagen: 'https://cdn-icons-png.freepik.com/512/8787/8787075.png' },
        { id:7, nombre: 'Parlante', precio: '$87.000', imagen: 'https://cdn-icons-png.freepik.com/512/8787/8787075.png' },
    ];

    const [cart, setCart] = useState([]);

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
        <main style={{ padding: "20px" }}>  
            <h2>Productos disponibles:</h2>  
            <div className='list-products'>
                {productos.map((producto,index)=>(
                    <TarjetaProducto producto={producto} key={index} addToCart={addToCart}></TarjetaProducto>
                ))}
            </div>
            
            <Carrito cart={cart} removeFromCart={removeFromCart} cleanCart={cleanCart}></Carrito>
        </main>  
    );  
}  
export default Main; 