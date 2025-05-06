import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Menu = ({ isOpen, toggleMenu, toggleContact, setActiveSection }) => {
  const navigate = useNavigate();
  
  // Handle the contact link click
  const handleContactClick = (e) => {
    e.preventDefault();
    toggleMenu();
    setTimeout(() => {
      toggleContact();
    }, 300);
  };
  
  // Handle navigation links
  const handleLinkClick = (e, path) => {
    e.preventDefault();
    console.log(`Link clicked: ${path}`);
    
    // Close the menu
    toggleMenu();
    
    // Navigate to the path
    navigate(path);
  };

  return (
    <nav className={`nav-menu ${isOpen ? 'active' : ''}`} id="top-menu">
      <button className="close-menu" onClick={toggleMenu}>
        <i className="ri-close-line"></i>
      </button>
      
      <ul className="top-menu">
        <li className="nav-item">
          <a
            href="#"
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
        <a href="#" className="nav-link" onClick={(e) => handleLinkClick(e, '/box')}>
          WHAT'S IN MY BOX?
        </a>
      </div>
    </nav>
  );
};

export default Menu;