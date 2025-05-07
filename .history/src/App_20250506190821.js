// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Menu from './components/Menu';
import BakeryBanner from './components/BakeryBanner';
import Shop from './components/Shop/Shop';
import ProductDetail from './components/Product/ProductDetail';
import CartPanel from './components/Cart/CartPanel';
import FloatingCartIcon from './components/Cart/FloatingCartIcon';
import ContactPopup from './components/Contact/ContactPopup';
import { CartProvider } from './context/CartContext';
import { ProductProvider } from './context/ProductContext';
import AboutUs from './components/AboutUs/AboutUs';
import Notification from './components/Notification';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('shop');
  const [notification, setNotification] = useState(null);
  
  useEffect(() => {
    console.log("Current activeSection:", activeSection);
  }, [activeSection]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
 
  const toggleContact = (shouldOpen) => {
    if (shouldOpen !== undefined) {
      setIsContactOpen(shouldOpen);
    } else {
      setIsContactOpen(prev => !prev);
    }
  };
 
  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const handleBackToShop = () => {
    setActiveSection('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Router>
      <ProductProvider>
        <CartProvider>
          <div className="App">
            <Header toggleMenu={toggleMenu} />
            <Menu
              isOpen={isMenuOpen}
              toggleMenu={toggleMenu}
              toggleContact={toggleContact}
              setActiveSection={setActiveSection}
            />
            <BakeryBanner />
            
            <Routes>
              <Route path="/" element={<Shop />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/about-us" element={<AboutUs setActiveSection={setActiveSection} />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            
            <CartPanel />
            <FloatingCartIcon />
           
            <ContactPopup
              isOpen={isContactOpen}
              toggleContact={toggleContact}
            />
           
            {notification && <Notification message={notification} />}
          </div>
        </CartProvider>
      </ProductProvider>
    </Router>
  );
};

export default App;