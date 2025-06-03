import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Menu = ({ isOpen, toggleMenu, toggleContact, setActiveSection }) => {
  const navigate = useNavigate();
  const { toggleCart } = useCart(); // get toggleCart function from CartContext
  
  // handle the contact link click
  const handleContactClick = (e) => {
    e.preventDefault();
    toggleMenu();
    setTimeout(() => {
      toggleContact();
    }, 300);
  };
  
  // handle navigation links
  const handleLinkClick = (e, path) => {
    e.preventDefault();
    console.log(`Link clicked: ${path}`);
    
    // close the menu
    toggleMenu();
    
    //iIf it's the shop link, scroll to shop section
    if (path === '/shop') {
      // check if we're already on the homepage
      if (window.location.pathname === '/' || window.location.pathname === '/shop') {
        // we're on homepage just scroll to shop section
        const shopSection = document.querySelector('.shop-section');
        if (shopSection) {
          shopSection.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        // we're on another page navigate home first then scroll
        navigate('/');
        // then scroll after a short delay to allow page render
        setTimeout(() => {
          const shopSection = document.querySelector('.shop-section');
          if (shopSection) {
            shopSection.scrollIntoView({ behavior: 'smooth' });
          }
        }, 300);
      }
    } else {
      // for other links navigate normally
      navigate(path);
    }
  };

  // handle the "what's in my box?" click
  const handleBoxClick = (e) => {
    e.preventDefault();
    toggleMenu(); // close the menu first
    setTimeout(() => {
      toggleCart(); // open the cart panel
    }, 300);
  };

  return (
    <nav className={`nav-menu ${isOpen ? 'active' : ''}`} id="top-menu">
      <button className="close-menu" onClick={toggleMenu}>
        <i className="ri-close-line"></i>
      </button>
      
      <ul className="top-menu">
        <li className="nav-item">
          <a
            href="#shop"
            className="nav-link"
            onClick={(e) => handleLinkClick(e, '/shop')}
          >
            SHOP
          </a>
        </li>
        <li className="nav-item">
          <a
            href="#"
            className="nav-link"
            onClick={(e) => handleLinkClick(e, '/about-us')}
          >
            ABOUT US
          </a>
        </li>
      </ul>
      
      <ul className="bottom-menu">
        <li className="nav-item">
          <a href="#" className="nav-link" onClick={(e) => e.preventDefault()}>
            PROGRAMS
          </a>
        </li>
        <li className="nav-item">
          <a
            href="#"
            className="nav-link"
            onClick={handleContactClick}
          >
            CONTACT
          </a>
        </li>
      </ul>
      
      <div className="middle-item">
        <a href="#" className="nav-link" onClick={handleBoxClick}>
          WHAT'S IN MY BOX?
        </a>
      </div>
    </nav>
  );
};

export default Menu;
