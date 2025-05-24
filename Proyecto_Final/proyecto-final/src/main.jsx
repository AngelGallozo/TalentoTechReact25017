import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom'
import { CarritoProvider } from './context/CarritoContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <CarritoProvider>
      <App />
    </CarritoProvider>
    </BrowserRouter>
  </StrictMode>,
)
