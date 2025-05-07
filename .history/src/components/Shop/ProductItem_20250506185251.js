import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import PropTypes from 'prop-types';

const ProductItem = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = '/images/placeholder.jpg'; // Make sure this exists
  };

  return (
    <div className="product-item" data-category={product.category}>
      <div className="product-image">
        <img 
          src={product.image} 
          alt={product.name}
          onError={handleImageError}
          loading="lazy"
        />
        <div className="hover-overlay">
          <div className="action-buttons">
            <button 
              className="add-btn"
              onClick={handleAddToCart}
              aria-label={`Add ${product.name} to cart`}
            >
              Add to Cart
            </button>
            <Link
              to={`/products/${product.id}`}
              className="view-btn"
              aria-label={`View ${product.name} details`}
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
      <div className="product-info">
        <h3 className="product-title">{product.name}</h3>
        <p className="product-price">{product.price} DZD</p>
      </div>
      
      {/* Add visible buttons outside of hover overlay for consistent appearance */}
      <div className="action-buttons">
        <button 
          className="add-btn"
          onClick={handleAddToCart}
          aria-label={`Add ${product.name} to cart`}
        >
          Add to Cart
        </button>
        <Link
          to={`/products/${product.id}`}
          className="view-btn"
          aria-label={`View ${product.name} details`}
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

ProductItem.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired
  }).isRequired
};

export default ProductItem;