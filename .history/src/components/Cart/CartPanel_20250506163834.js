// src/components/Cart/CartPanel.js
import React from 'react';
import { useCart } from '../../context/CartContext';
import './CartPanel.css'; // Import the CSS file

const CartPanel = () => {
  const { 
    cart, 
    isCartOpen, 
    toggleCart, 
    toggleItemSelection,
    removeSelectedItems, 
    clearCart, 
    total,
    updateQuantity
  } = useCart();
  
  // Function to handle updating the cart
  const handleUpdateCart = () => {
    // Show a toast or notification
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.textContent = 'Cart updated!';
    document.body.appendChild(notification);
    
    // Remove the notification after 3 seconds
    setTimeout(() => {
      notification.classList.add('fade-out');
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 500);
    }, 2500);
  };
  
  // Function to handle proceeding to checkout - modified to match reference site
  const handleCheckout = () => {
    // Create modal overlay like the reference site
    const overlay = document.createElement('div');
    overlay.className = 'checkout-overlay';
    
    // Create modal content
    const modal = document.createElement('div');
    modal.className = 'checkout-modal';
    
    // Modal header - matches the reference site style
    const header = document.createElement('div');
    header.className = 'modal-header';
    header.innerHTML = `
      <div class="modal-header-content">
        <span class="modal-site-name">happyovenver1235236372</span>
        <span class="modal-indique">indique</span>
      </div>
    `;
    
    // Modal message - matches the reference site style
    const message = document.createElement('div');
    message.className = 'modal-message';
    message.innerHTML = `
      <div class="modal-message-content">
        <p>Proceeding to checkout!</p>
      </div>
    `;
    
    // Modal button container - matches reference site
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'modal-button-container';
    
    // Modal button - matches reference site style
    const button = document.createElement('button');
    button.className = 'modal-button';
    button.textContent = 'OK';
    button.onclick = () => {
      document.body.removeChild(overlay);
    };
    
    // Append elements
    buttonContainer.appendChild(button);
    modal.appendChild(header);
    modal.appendChild(message);
    modal.appendChild(buttonContainer);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    
    // Add the same animation as reference site
    setTimeout(() => {
      overlay.style.opacity = '1';
      modal.style.transform = 'translateY(0)';
    }, 10);
  };

  if (!isCartOpen) return null;

  return (
    <>
      <div className="cart-panel active">
        <div className="cart-panel-header">
          <h2>What's in my box?</h2>
          <button className="close-cart" onClick={toggleCart}>
            <i className="ri-close-line"></i>
          </button>
        </div>
        <div className="cart-panel-content">
          {cart.length === 0 ? (
            <div className="empty-start" id="empty-cart-message">
              <i className="ri-shopping-basket-2-line empty-cart-icon"></i>
              <p>Looks like you haven't added anything yet, let's get you started</p>
              <button className="continue-shopping-btn" onClick={toggleCart}>Fill your box!</button>
            </div>
          ) : (
            <>
              <div className="view-item">
                <p><strong>What do I have here:</strong></p>
                <div className="cart-item-list">
                  {cart.map(item => (
                    <div key={item.id} className="cart-detail-row">
                      <input 
                        type="checkbox" 
                        checked={item.selected} 
                        onChange={() => toggleItemSelection(item.id)}
                        id={`item-${item.id}`}
                      />
                      <label htmlFor={`item-${item.id}`} className="item-name">{item.name}</label>
                      <div className="quantity-controls">
                        <button 
                          className="decrease-btn" 
                          onClick={() => updateQuantity(item.id, -1)}
                          aria-label="Decrease quantity"
                        >−</button>
                        <span className="item-qty">{item.quantity}</span>
                        <button 
                          className="increase-btn" 
                          onClick={() => updateQuantity(item.id, 1)}
                          aria-label="Increase quantity"
                        >+</button>
                      </div>
                      <span className="item-price">{item.price * item.quantity} DZD</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="cart-summary">
                <p><strong>Total:</strong> <span>{total} DZD</span></p>
              </div>
              
              <div className="manage-box">
                <h3>Manage your box:</h3>
                <div className="manage-box-controls">
                  <div className="manage-option">
                    <button className="add-more-btn" onClick={toggleCart}>
                      <i className="ri-add-circle-line"></i> Add More Items
                    </button>
                  </div>
                  <div className="manage-option">
                    <button className="remove-selected-btn" onClick={removeSelectedItems}>
                      <i className="ri-delete-bin-2-line"></i> Remove Selected
                    </button>
                  </div>
                  <div className="manage-option">
                    <button className="clear-box-btn" onClick={clearCart}>
                      <i className="ri-close-circle-line"></i> Clear Box
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="checkout-controls">
                <button className="update-cart-btn" onClick={handleUpdateCart}>Update Box</button>
                <button className="checkout-btn" onClick={handleCheckout}>Proceed to Checkout</button>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="cart-overlay" onClick={toggleCart}></div>
    </>
  );
};

export default CartPanel;