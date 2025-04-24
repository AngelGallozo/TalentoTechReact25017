import React from 'react';
import TarjetaProducto from './TarjetaProducto';

function Main({ productos, cargando, error, addToCart }) {
    return (
      <main>
        <h2>Productos disponibles:</h2>
        {cargando && <p>Cargando productos...</p>}
        {error && <p>{error}</p>}
  
        {!cargando && !error && (
          <div className='list-products'>
            {productos.map((producto, index) => (
              <TarjetaProducto
                producto={producto}
                key={index}
                addToCart={addToCart}
              />
            ))}
          </div>
        )}
      </main>
    );
  }
  
export default Main; 