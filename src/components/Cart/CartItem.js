import React from 'react';
import { useCart } from '../../context/CartContext';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart, toggleItemSelection } = useCart();
  const itemTotal = item.price * item.quantity;

  return (
    <div className={`cart-item ${item.selected ? 'selected' : ''}`}>
      <input 
        type="checkbox" 
        className="item-checkbox" 
        checked={item.selected} 
        onChange={() => toggleItemSelection(item.id)}
      />
      <span className="item-name">{item.name}</span>
      <div className="item-controls">
        <button 
          className="decrease-btn" 
          onClick={() => updateQuantity(item.id, -1)}
        >−</button>
        <span className="item-qty">{item.quantity}</span>
        <button 
          className="increase-btn" 
          onClick={() => updateQuantity(item.id, 1)}
        >+</button>
      </div>
      <span className="item-price">{itemTotal} DZD</span>
      <button 
        className="remove-btn" 
        onClick={() => removeFromCart(item.id)}
      >
        <i className="ri-delete-bin-line"></i>
      </button>
    </div>
  );
};

export default CartItem;
