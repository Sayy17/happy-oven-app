import React from 'react';

const Header = ({ toggleMenu }) => {
  return (
    <header>
      <div className="nav-container">
        <div className="logo">Happy Oven</div>
        <button className="nav-toggle" onClick={toggleMenu}>
          <i className="ri-menu-line"></i>
        </button>
      </div>
    </header>
  );
};

export default Header;