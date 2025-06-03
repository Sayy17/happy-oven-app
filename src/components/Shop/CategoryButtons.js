import React from 'react';
import PropTypes from 'prop-types';

const CategoryButtons = ({ activeCategory, onCategoryChange }) => {
  const categories = [
    { id: 'all', name: 'All' },
    { id: 'cookies', name: 'Cookies' },
    { id: 'pastries', name: 'Pastries' },
    { id: 'cakes', name: 'Cakes' },
    { id: 'savory foods', name: 'Special' } 
  ];

  return (
    <div className="product-categories">
      {categories.map(category => (
        <button
          key={category.id}
          className={`category-button ${activeCategory === category.id ? 'active' : ''}`}
          onClick={() => onCategoryChange(category.id)}
          aria-label={`Filter by ${category.name}`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

CategoryButtons.propTypes = {
  activeCategory: PropTypes.string.isRequired,
  onCategoryChange: PropTypes.func.isRequired
};

export default CategoryButtons;
