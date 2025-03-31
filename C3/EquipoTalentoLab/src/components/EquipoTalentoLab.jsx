import React from "react";
import TarjetaIntegrante from "./TarjetaIntegrante";

function EquipoTalentoLab({equipo}){
    return(
        <div className="team-cards">
            {equipo.map((miembro,index)=>(
                <TarjetaIntegrante miembro = {miembro} key={index}>

                </TarjetaIntegrante>
            ))}
        </div>
    )
}

export default EquipoTalentoLab;