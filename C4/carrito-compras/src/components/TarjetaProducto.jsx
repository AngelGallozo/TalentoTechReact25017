import React from "react";
import { useState } from "react";

function TarjetaProducto({producto,addToCart}){

    return(
        <div className="card-product">
            <p className="titulo-proyecto">
                {producto.nombre}
            </p>

            <p className="descripcion-proyecto">
                {producto.precio}
            </p>

            <img src={producto.imagen} alt="Imagen integrante" style={{ width: "150px", height: "150px" }} />  

            <button onClick={() => addToCart(producto)}>
                Agreg. Carro
            </button>
        </div>
    )
}

export default TarjetaProducto;