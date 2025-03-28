import Boton from "./Boton";

function Tarjeta({titulo,descripcion,botonTexto}){
    return(
        <div className="card">
            <p className="card-titulo">{titulo}</p>
            <p className="card-descripcion">{descripcion}</p>
            <Boton 
                texto = {botonTexto}
                className="btn-info"
            >

            </Boton>
        </div>
    )
}

export default Tarjeta;