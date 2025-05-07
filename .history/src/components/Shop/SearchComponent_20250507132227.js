import React, { useState, useEffect, useCallback } from 'react';
import { useProducts } from '../../context/ProductContext';
import PropTypes from 'prop-types';

const SearchComponent = ({ onSearch, activeCategory }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState({ count: 0, message: '' });
  const { products } = useProducts();
  
  const performSearch = useCallback((term = searchTerm) => {
    const trimmedTerm = term.trim().toLowerCase();
    
    if (trimmedTerm === '') {
      const categoryProducts = activeCategory === 'all' 
        ? products 
        : products.filter(product => product.category === activeCategory);
      
      setSearchResults({ count: 0, message: '' });
      onSearch?.(categoryProducts, '');
      return;
    }
    
    let matchedProducts = products.filter(product => 
      product.name.toLowerCase().includes(trimmedTerm)
    );
    
    if (activeCategory && activeCategory !== 'all') {
      matchedProducts = matchedProducts.filter(product => 
        product.category === activeCategory
      );
    }
    
    const count = matchedProducts.length;
    setSearchResults({
      count,
      message: count > 0 
        ? `Found ${count} product${count !== 1 ? 's' : ''}` 
        : 'No products found'
    });
    
    onSearch?.(matchedProducts, trimmedTerm);
  }, [activeCategory, onSearch, products, searchTerm]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      performSearch();
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, performSearch]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      performSearch();
    }
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    const categoryProducts = activeCategory === 'all' 
      ? products 
      : products.filter(product => product.category === activeCategory);
    setSearchResults({ count: 0, message: '' });
    onSearch?.(categoryProducts, '');
  };

  return (
    <div className="search-container">
      <div className="search-bar">
        <input
          type="text"
          id="search-input"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          aria-label="Search products"
        />
        {searchTerm && (
 
        )}
        <button 
          id="search-button" 
          onClick={() => performSearch()}
          aria-label="Search"
        >
          <i className="ri-search-line"></i>
        </button>
      </div>
      {searchResults.message && (
        <div className="search-results" id="search-results-count">
          <span>{searchResults.message}</span>
        </div>
      )}
    </div>
  );
};

SearchComponent.propTypes = {
  onSearch: PropTypes.func,
  activeCategory: PropTypes.string.isRequired
};

export default SearchComponent;