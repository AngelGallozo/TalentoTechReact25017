function ListaProductos({productos}){

    return (
        <div className="list-products">
            <ol>
                {
                productos.map(producto=>(
                    <li key={producto}>{producto}</li>
                ))}
            </ol>
        </div>
    )
}

export default ListaProductos;