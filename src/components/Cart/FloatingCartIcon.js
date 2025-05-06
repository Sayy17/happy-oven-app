// src/components/Cart/FloatingCartIcon.js
import React from 'react';
import { useCart } from '../../context/CartContext';

const FloatingCartIcon = () => {
  const { toggleCart, itemCount } = useCart();

  return (
    <a href="#" className="cart-float" onClick={(e) => {
      e.preventDefault();
      toggleCart();
    }}>
      <i className="ri-shopping-cart-line"></i>
      {itemCount > 0 && (
        <span className="cart-count">{itemCount}</span>
      )}
    </a>
  );
};

export default FloatingCartIcon;