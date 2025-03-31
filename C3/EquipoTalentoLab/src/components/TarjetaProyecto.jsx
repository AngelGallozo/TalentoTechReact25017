import React from "react";

function TarjetaProyecto({titulo,descripcion,botonTexto}){

    const mostrarProyecto= ()=>{
        console.log(`Explorando:${titulo}`);
    }

    return(
        <div className="card-proyecto">
            <p className="titulo-proyecto">
                {titulo}
            </p>

            <p className="descripcion-proyecto">
                {descripcion}
            </p>
            <button onClick={mostrarProyecto}>
                {botonTexto}
            </button>
        </div>
    )
}

export default TarjetaProyecto;