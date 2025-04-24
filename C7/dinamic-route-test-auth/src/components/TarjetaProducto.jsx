import React from "react";
import { Link } from 'react-router-dom';

function TarjetaProducto({producto,addToCart}){

    return(

          
            <div className="card-product">

                <p className="titulo-producto">{producto.nombre}</p>
                <p className="descripcion-producto">{producto.precio}</p>

                <Link className="nav-link" to={`/productos/${producto.id}`} >
                    <img src={"https://cdn-icons-png.freepik.com/512/8787/8787075.png"} alt="Imagen integrante" style={{ width: "150px", height: "150px" }} />  
                </Link>

                <button onClick={() => addToCart(producto)}>
                    Agreg. Carro
                </button>
            </div>
    )
}

export default TarjetaProducto;