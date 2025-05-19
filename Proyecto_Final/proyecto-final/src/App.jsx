import NavBar from './components/NavBar';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import {BrowserRouter as Router, Route,Routes} from "react-router-dom"
import Footer from './components/Footer';
import { useEffect,useState } from 'react';
import Login from './pages/Login';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Carrito from './pages/Carrito';
import Admin from './pages/Admin';
import RutaProtegida from './components/RutaProtegida';
import { useNavigate } from "react-router-dom";

function App() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);
  const isLogued = localStorage.getItem('logued') === 'true';
  const navigate = useNavigate();


  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
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
    if (isLogued) {
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

      toast.success(`${product.title} agregado al carrito`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      navigate("/login", { replace: true });
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const cleanCart = () => {
    setCart([]);
  };


  return (
    <div>
        <div>
          <NavBar/>
            <Routes>
              <Route path='/' element={<Home productos={productos} cargando={cargando} error={error} addToCart={addToCart}/>} />
              <Route path='/about' element={<About/>} />
              <Route path='/contact' element={<Contact/>} />
              <Route path='/login' element={<Login/>} />
              <Route path='/carrito' element={ 
                <RutaProtegida>
                  <Carrito
                    cart={cart}
                    removeFromCart={removeFromCart}
                    cleanCart={cleanCart}
                  />
                </RutaProtegida>
              } />
              <Route path='/admin' element={<RutaProtegida> <Admin/> </RutaProtegida>} />
            </Routes>
            <Footer/>
            <ToastContainer />
        </div>
    </div>
  )
}

export default App
