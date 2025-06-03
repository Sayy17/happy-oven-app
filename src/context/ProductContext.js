import React, { createContext, useContext, useState, useEffect } from 'react';
import initialProducts from '../data/products';

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

const parseNumericValue = (value) => {
  if (typeof value !== 'string') return value;
  
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
    const savedProducts = localStorage.getItem('bakeryProducts');
    
    const shouldResetViews = true;
    
    if (savedProducts) {
      const parsedProducts = JSON.parse(savedProducts);
      return parsedProducts.map(product => ({
        ...product,
        // Convert string values
        views: shouldResetViews ? 0 : (typeof product.views === 'string' ? parseNumericValue(product.views) : product.views),
        sold: typeof product.sold === 'string' ? parseNumericValue(product.sold) : product.sold
      }));
    }
    
    return initialProducts.map(product => ({
      ...product,
      views: shouldResetViews ? 0 : (typeof product.views === 'string' ? parseNumericValue(product.views) : product.views),
      sold: typeof product.sold === 'string' ? parseNumericValue(product.sold) : product.sold
    }));
  });

  // save products to localsorage whenever they change
  useEffect(() => {
    localStorage.setItem('bakeryProducts', JSON.stringify(products));
  }, [products]);

  // function to reset all view counts to zero
  const resetAllViewCounts = () => {
    setProducts(currentProducts => 
      currentProducts.map(product => ({
        ...product,
        views: 0
      }))
    );
    // also clear the viewed products in session storage
    sessionStorage.removeItem('viewedProducts');
  };

  // fnction to increment product views
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

  // function to increment product sales
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

  // function to format numbers with K 
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

  // get products by category
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
