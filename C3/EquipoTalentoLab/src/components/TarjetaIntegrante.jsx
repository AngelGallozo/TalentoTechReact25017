import React from "react";

function TarjetaIntegrante({miembro}){
    return(
        <div className="card-member">
            <p className="name">{miembro.nombre}</p>
            <p className="rol">{miembro.rol}</p>
            <img src={miembro.imagen} alt="Imagen integrante" style={{ width: "150px", height: "150px" }} />  
        </div>
    )
}

export default TarjetaIntegrante;