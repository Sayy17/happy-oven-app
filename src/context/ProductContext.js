import React, { createContext, useContext, useState, useEffect } from 'react';
import initialProducts from '../data/products';

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

// Helper function to parse values like "1.2K" into numeric values (1200)
const parseNumericValue = (value) => {
  if (typeof value !== 'string') return value;
  
  // Remove any non-numeric characters except '.' and K/M suffixes
  const match = value.replace(/[^\d.KMkm]/g, '').match(/^(\d+(\.\d+)?)([KMkm])?$/);
  
  if (!match) return 0;
  
  const [, num, , suffix] = match;
  const baseValue = parseFloat(num);
  
  if (suffix && ['K', 'k'].includes(suffix)) {
    return baseValue * 1000;
  } else if (suffix && ['M', 'm'].includes(suffix)) {
    return baseValue * 1000000;
  }
  
  return baseValue;
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    // Try to load products from localStorage first
    const savedProducts = localStorage.getItem('bakeryProducts');
    
    // Reset flag - set to true to reset all view counts to 0
    const shouldResetViews = true;
    
    if (savedProducts) {
      const parsedProducts = JSON.parse(savedProducts);
      return parsedProducts.map(product => ({
        ...product,
        // Convert string values like "1.2K" to actual numbers (1200)
        views: shouldResetViews ? 0 : (typeof product.views === 'string' ? parseNumericValue(product.views) : product.views),
        sold: typeof product.sold === 'string' ? parseNumericValue(product.sold) : product.sold
      }));
    }
    
    // Otherwise, use the initial products with converted numeric values and reset views
    return initialProducts.map(product => ({
      ...product,
      views: shouldResetViews ? 0 : (typeof product.views === 'string' ? parseNumericValue(product.views) : product.views),
      sold: typeof product.sold === 'string' ? parseNumericValue(product.sold) : product.sold
    }));
  });

  // Save products to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('bakeryProducts', JSON.stringify(products));
  }, [products]);

  // Function to reset all view counts to zero
  const resetAllViewCounts = () => {
    setProducts(currentProducts => 
      currentProducts.map(product => ({
        ...product,
        views: 0
      }))
    );
    // Also clear the viewed products in session storage
    sessionStorage.removeItem('viewedProducts');
  };

  // Function to increment product views
  const incrementProductViews = (productId) => {
    setProducts(currentProducts => 
      currentProducts.map(product => 
        product.id === productId 
          ? { 
              ...product, 
              views: (product.views || 0) + 1 
            } 
          : product
      )
    );
  };

  // Function to increment product sales
  const incrementProductSales = (productId, quantity = 1) => {
    setProducts(currentProducts => 
      currentProducts.map(product => 
        product.id === productId 
          ? { 
              ...product, 
              sold: (product.sold || 0) + quantity 
            } 
          : product
      )
    );
  };

  // Function to update product reviews
  const updateProductReviews = (productId, newReview) => {
    setProducts(currentProducts => 
      currentProducts.map(product => 
        product.id === productId 
          ? { 
              ...product, 
              reviews: [...(product.reviews || []), newReview] 
            } 
          : product
      )
    );
  };

  // Function to format numbers with K, M suffixes
  const formatNumber = (num) => {
    if (typeof num === 'string') {
      return num; // Already formatted
    }
    
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    }
    return num.toString();
  };

  // Get products by category
  const getProductsByCategory = (category) => {
    if (category === 'all') {
      return products;
    }
    return products.filter(product => product.category === category);
  };

  const value = {
    products,
    setProducts,
    incrementProductViews,
    incrementProductSales,
    updateProductReviews,
    formatNumber,
    getProductsByCategory,
    resetAllViewCounts
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};
