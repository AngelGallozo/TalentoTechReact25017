import React from "react";

function Carrito({ cart, removeFromCart, cleanCart }) {
    return (
        <div className="container mt-4">
            <h2 className="text-center">Carrito de Compras</h2>
            {cart.length === 0 ? (
                <p>El carrito está vacío.</p>
            ) : (
                <ol className="list-group">
                    {cart.map((producto, index) => (
                        <li className="list-group-item d-flex justify-content-between align-items-center" key={index}>
                            {producto.nombre} x {producto.quantity} - ${producto.precio}
                            <button className="btn btn-danger btn-sm" onClick={() => removeFromCart(producto.id)}> X </button>
                        </li>
                    ))}
                </ol>
            )}
            <button className="btn btn-warning mt-3" onClick={() => cleanCart()}>Limpiar carrito</button>
        </div>
    );
}

export default Carrito;
