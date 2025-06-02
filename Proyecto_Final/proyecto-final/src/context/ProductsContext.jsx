import React, { createContext, useEffect, useState, useRef } from 'react';

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    const maxIdRef = useRef(0); // Referencia al ID máximo

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const resFake = await fetch('https://fakestoreapi.com/products');
                if (!resFake.ok) throw new Error("Error al cargar productos de FakeStore");
                const productosFake = await resFake.json();

                const resMock = await fetch("https://67eaf4ae34bcedd95f651d8e.mockapi.io/api/products");
                if (!resMock.ok) throw new Error("Error al cargar productos de MockAPI");
                const productosMock = await resMock.json();

                // Unimos productos y detectamos el mayor ID numérico
                const productosCombinados = [...productosFake, ...productosMock];
                const maxId = productosCombinados.reduce((acc, prod) => {
                    const idNum = Number(prod.id);
                    return !isNaN(idNum) && idNum > acc ? idNum : acc;
                }, 0);

                maxIdRef.current = maxId;
                setProductos(productosCombinados);
            } catch (err) {
                console.error(err);
                setError("No se pudieron cargar los productos.");
            } finally {
                setCargando(false);
            }
        };

        fetchProductos();
    }, []);

    const agregarProducto = (nuevoProducto) => {
        maxIdRef.current += 1;
        const productoConId = { ...nuevoProducto, id: maxIdRef.current };
        setProductos(prev => [...prev, productoConId]);
        console.log(productoConId);
    };

    const editarProducto = (productoActualizado) => {
        console.log(productoActualizado);
        setProductos(prev =>
            prev.map((p) => (p.id === productoActualizado.id ? productoActualizado : p))
        );
    };

    const eliminarProducto = (id) => {
        setProductos(prev => prev.filter((p) => p.id !== id));
    };

    return (
        <ProductsContext.Provider
            value={{ productos, agregarProducto, editarProducto, eliminarProducto, cargando, error }}>
            {children}
        </ProductsContext.Provider>
    );
};
