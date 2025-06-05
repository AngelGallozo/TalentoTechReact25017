import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom'
import { CarritoProvider } from './context/CarritoContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { ProductsProvider } from './context/ProductsContext';
import { HelmetProvider } from 'react-helmet-async';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider> {/* Mover esto arriba de todo */}
      <BrowserRouter>
        <AuthProvider>
          <CarritoProvider>
            <ProductsProvider>
              <App />
            </ProductsProvider>
          </CarritoProvider>
        </AuthProvider>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
)
