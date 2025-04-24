import React from "react";
import { useParams } from "react-router-dom";
import productosData from './productos.json';

function ProductoDetalle(){
    const {id} = useParams();

    const producto = productosData.find(p => p.id === parseInt(id));

  if (!producto) return <div>Producto no encontrado</div>;

  return (
    <div>
      <h2>{producto.nombre}</h2>
      <p>{producto.descripcion}</p>
    </div>
  );
}

export default ProductoDetalle;