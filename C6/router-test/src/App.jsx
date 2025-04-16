import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import About from './components/pages/About';
import Contacto from './components/pages/Contacto';
import Main from './components/Main';
import Header from './components/Header';
import Footer from './components/Footer';
import './styles/style.css';

function App() {
  return (
    <Router>
      <Header />
      <Nav />
      
      <main>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/about" element={<About />} />
          <Route path="/contacto" element={<Contacto />} />
        </Routes>
      </main>

      <Footer />
    </Router>
  );
}

export default App;
