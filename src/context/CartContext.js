import React, { createContext, useContext, useState, useEffect } from 'react';

// create the cart context
const CartContext = createContext();

// hook to use the cart context
export const useCart = () => useContext(CartContext);

// cart provider component
export const CartProvider = ({ children }) => {
  // state for cart items, cart open status, and total
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // calculate item count (total quantity of all items)
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
  
  // calculate total price
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // load cart from localstorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('happyOvenCart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error parsing cart from localStorage:', error);
        setCart([]);
      }
    }
  }, []);

  // save cart to localstorage whenever it changes
  useEffect(() => {
    localStorage.setItem('happyOvenCart', JSON.stringify(cart));
  }, [cart]);

  // toggle cart open/closed
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  // add item to cart
  const addToCart = (product) => {
    setCart(prevCart => {
      // check if product already exists in cart
      const existingItem = prevCart.find(item => item.id === product.id);
      
      if (existingItem) {
        // increase quantity if item already exists
        return prevCart.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        // add new item with quantity 1 and selected true
        return [...prevCart, { ...product, quantity: 1, selected: true }];
      }
    });
    
  };

  // update item quantity
  const updateQuantity = (itemId, change) => {
    setCart(prevCart => {
      return prevCart.map(item => {
        if (item.id === itemId) {
          const newQuantity = Math.max(1, item.quantity + change);
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
    });
  };

  // remove item from cart
  const removeFromCart = (itemId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId));
  };

  // toggle item selection
  const toggleItemSelection = (itemId) => {
    setCart(prevCart => 
      prevCart.map(item => 
        item.id === itemId 
          ? { ...item, selected: !item.selected } 
          : item
      )
    );
  };

  // remove selected items
  const removeSelectedItems = () => {
    setCart(prevCart => prevCart.filter(item => !item.selected));
  };

  // clear cart
  const clearCart = () => {
    setCart([]);
  };

  // context value to provide
  const value = {
    cart,
    isCartOpen,
    itemCount,
    total,
    toggleCart,
    addToCart,
    updateQuantity,
    removeFromCart,
    toggleItemSelection,
    removeSelectedItems,
    clearCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
