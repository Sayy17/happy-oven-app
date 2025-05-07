import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import PropTypes from 'prop-types';

const ProductGrid = ({ products, onProductClick }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e, product) => {
    e.preventDefault(); // Prevent navigation
    e.stopPropagation(); // Prevent event bubbling
    addToCart(product);
  };

  // Function to handle image errors
  const handleImageError = (e) => {
    e.target.onerror = null; // Prevent infinite loop
    e.target.src = '/images/placeholder.jpg'; // Set default placeholder
  };

  return (
    <div className="product-grid">
      {products.length === 0 ? (
        <div className="no-products">No products found</div>
      ) : (
        products.map((product) => (
          <div key={product.id} className="product-card">
            <Link 
              to={`/products/${product.id}`} 
              className="product-link"
              onClick={() => onProductClick(product.id)}
            >
              <div className="product-image">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  onError={handleImageError}
                />
              </div>
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-price">{product.price} DZD</p>
              </div>
            </Link>
            <div className="product-actions">
              <button
                className="add-to-cart"
                onClick={(e) => handleAddToCart(e, product)}
                aria-label={`Add ${product.name} to cart`}
              >
                Add to Cart
              </button>
              <Link 
                to={`/products/${product.id}`}
                className="view-details"
                onClick={() => onProductClick(product.id)}
                aria-label={`View ${product.name} details`}
              >
                View Details
              </Link>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

ProductGrid.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired
    })
  ).isRequired,
  onProductClick: PropTypes.func
};

export default ProductGrid;