import React,{useState, createContext} from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
// crear el contexto
export const CarritoContext =  createContext();
// Proveedor del contexto
export function CarritoProvider({children}){
    const navigate = useNavigate();
    const isLogued = localStorage.getItem('logued') ==='true';
    const [cart, setCart] = useState([]);

    const removeFromCart = (productId) => {
        setCart(cart.filter((item) => item.id !== productId));
    };

    const cleanCart = ()=>{
        setCart([]);
    };

    const addToCart = (product, cantidad = 1) => {
        if (isLogued) {
            setCart((prevCart) => {
                const existingItem = prevCart.find((item) => item.id === product.id);

                if (existingItem) {
                return prevCart.map((item) =>
                    item.id === product.id
                    ? { ...item, quantity: item.quantity + cantidad }
                    : item
                );
                } else {
                    return [...prevCart, { ...product, quantity: cantidad }];
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

    const updateQuantity = (id, quantity) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

    return(
        <CarritoContext.Provider value={{cart, addToCart,cleanCart, removeFromCart,updateQuantity}}>
            {children}
        </CarritoContext.Provider>
    );


}