
import './App.css';
import Boton from './components/Boton';
import ListaProductos from './components/ListaProductos';
import Tarjeta from './components/Tarjeta';

function App() {
  const productos = ['Manzana','Banana','Pera','Sandia','Ananá'
  ];

  return (
    <div>
      <ListaProductos productos={productos} />
      <Tarjeta
        titulo="Oferta especial"
        descripcion= "20% de descuento en todos los productos"
        botonTexto="ver mas.."
        botonClassName="btn-info">
      </Tarjeta>
      <div className='buttons'>
        <Boton texto = "Aceptar" className="btn-success"></Boton>
        <Boton texto = "Cancelar" className="btn-danger"></Boton>
        <Boton texto = "Modificar" className="btn-warning"></Boton>
      </div>
    </div>
    
      
  );
}

export default App;