import React, { useState, useEffect, useCallback } from 'react';
import { useProducts } from '../../context/ProductContext';
import PropTypes from 'prop-types';

const SearchComponent = ({ onSearch, activeCategory }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState({ count: 0, message: '', isSearched: false });
  const { products } = useProducts();
  
  const performSearch = useCallback((term = searchTerm) => {
    const trimmedTerm = term.trim().toLowerCase();
    
    if (trimmedTerm === '') {
      const categoryProducts = activeCategory === 'all' 
        ? products 
        : products.filter(product => product.category === activeCategory);
      
      setSearchResults({ count: 0, message: '', isSearched: false });
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
        : 'No products found',
      isSearched: true
    });
    
    onSearch?.(matchedProducts, trimmedTerm);
  }, [activeCategory, onSearch, products, searchTerm]);

  // Remove debounced search so it only happens on button click or Enter key
  // We don't want automatic searching while typing anymore
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      performSearch();
    }
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    // Clear the "isSearched" flag when user starts typing again
    if (searchResults.isSearched) {
      setSearchResults(prev => ({ ...prev, isSearched: false }));
    }
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    const categoryProducts = activeCategory === 'all' 
      ? products 
      : products.filter(product => product.category === activeCategory);
    setSearchResults({ count: 0, message: '', isSearched: false });
    onSearch?.(categoryProducts, '');
  };

  const handleSearchClick = () => {
    performSearch();
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
          <button 
            id="clear-search" 
            onClick={handleClearSearch}
            aria-label="Clear search"
          >
            <i className="ri-close-line"></i>
          </button>
        )}
        <button 
          id="search-button" 
          onClick={handleSearchClick}
          aria-label="Search"
          className={searchResults.isSearched ? "active-search" : ""}
        >
          <i className="ri-search-line"></i>
        </button>
      </div>
      {searchResults.isSearched && (
        <div className="search-results-container" id="search-results">
          <div className="search-results-count" id="search-results-count">
            <span>{searchResults.message}</span>
          </div>
          {searchResults.count === 0 && searchTerm.trim() !== '' && (
            <div className="no-results-message">
              <p>Try a different search term or browse categories</p>
            </div>
          )}
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