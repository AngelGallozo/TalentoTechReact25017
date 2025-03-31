import React from "react";

function Carrito({cart, removeFromCart,cleanCart}){
    return(
        <div className="container-cart">
            <h2>Carrito de Compras</h2>
            {cart.length === 0 ? (
                <p>El carrito está vacío.</p>
            ) : (
            <ol className="list-cart">
                {cart.map((producto,index)=>(
                    <li className="item-cart" key={index}>{` ${producto.nombre} x ${producto.quantity} - ${producto.precio}   `}
                    <button onClick={() => removeFromCart(producto.id)}> X </button>
                    </li>
                ))}
            </ol>
            )}
            <button onClick={() => cleanCart()}> Limpiar carrito </button>
        </div>
    )
}

export default Carrito;