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
    e.target.src = '/images/placeholder.jpg';
  };

  return (
    <Link 
      to={`/products/${product.id}`}
      className="product-item" 
      data-category={product.category}
      aria-label={`View ${product.name} details`}
    >
      <div className="product-image">
        <img 
          src={product.image} 
          alt={product.name}
          onError={handleImageError}
          loading="lazy"
        />
        <div className="hover-overlay">
          <button 
            className="add-btn"
            onClick={handleAddToCart}
            aria-label={`Add ${product.name} to cart`}
          >
            Add to cart
          </button>
          <Link
            to={`/products/${product.id}`}
            className="details-btn"
            aria-label={`View ${product.name} details`}
          >
            See Details
          </Link>
        </div>
      </div>
      <div className="product-info">
        <h3 className="product-title">{product.name}</h3>
        <p className="product-price">{product.price} DZD</p>
      </div>
    </Link>
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