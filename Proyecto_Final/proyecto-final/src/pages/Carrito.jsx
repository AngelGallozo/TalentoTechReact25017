import React from "react";

function Carrito({ cart, removeFromCart, cleanCart }) {
    console.log(cart)
    return (
        <div className="container mt-4 d-flex flex-column justify-content-center align-items-center">
            <h2 className="text-center">Carrito de Compras</h2>
            {cart.length === 0 ? (
                <p>El carrito está vacío.</p>
            ) : (
                <ol className="list-group d-flex align-items-center">
                    {cart.map((producto, index) => (
                        <li className="list-group-item d-flex justify-content-between align-items-center item-cart" key={index}>
                            {producto.title} x {producto.quantity} - ${producto.price}
                            <button className="btn btn-danger btn-sm ms-3" onClick={() => removeFromCart(producto.id)}> X </button>
                        </li>
                    ))}
                </ol>
            )}
            <button className="btn btn-warning mt-3" onClick={() => cleanCart()}>Limpiar carrito</button>
        </div>
    );
}

export default Carrito;
