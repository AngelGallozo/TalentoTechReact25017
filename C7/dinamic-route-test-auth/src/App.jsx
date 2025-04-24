import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import About from './components/pages/About';
import Contacto from './components/pages/Contacto';
import Main from './components/Main';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductoDetalle from './components/pages/ProductoDetalle';
import Carrito from './components/Carrito'; // 🆕 Importá el componente Carrito
import './styles/style.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch('https://67eaf4ae34bcedd95f651d8e.mockapi.io/productos/productos')
      .then((res) => {
        if (!res.ok) throw new Error('Error al cargar productos');
        return res.json();
      })
      .then((data) => {
        setProductos(data);
        setCargando(false);
      })
      .catch((err) => {
        console.error(err);
        setError('No se pudieron cargar los productos.');
        setCargando(false);
      });
  }, []);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
  
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  
    toast.success(`${product.nombre} agregado al carrito`, {
      position: "top-right",
      autoClose: 2000, // milisegundos
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  
  

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const cleanCart = () => {
    setCart([]);
  };

  return (
    <Router>
      <Header />
      <Nav />

      <main>
        <Routes>
          <Route
            path="/"
            element={
              <Main
                productos={productos}
                cargando={cargando}
                error={error}
                addToCart={addToCart}
              />
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/productos/:id" element={<ProductoDetalle />} />
          <Route
            path="/carrito"
            element={
              <Carrito
                cart={cart}
                removeFromCart={removeFromCart}
                cleanCart={cleanCart}
              />
            }
          />
        </Routes>
      </main>

      <Footer />
      <ToastContainer />
    </Router>
  );
}

export default App;
