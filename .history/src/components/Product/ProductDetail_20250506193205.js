import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '../../context/ProductContext';
import { useCart } from '../../context/CartContext';
import ReviewForm from './ReviewForm';
import products from '../../data/products'; // Import products data as fallback

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products: contextProducts, updateProductReviews } = useProducts();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    
    // Use either context products or imported products as fallback
    const productsToUse = (contextProducts && contextProducts.length > 0) 
      ? contextProducts 
      : products;
    
    // Find the product by ID from the URL parameter
    const parsedId = parseInt(id);
    const foundProduct = productsToUse.find(p => p.id === parsedId);
    
    if (foundProduct) {
      setProduct(foundProduct);
      // Simulate incrementProductViews logic
      console.log(`Viewing product: ${foundProduct.name}`);
    } else {
      console.log("Product not found, redirecting to shop");
    }
    
    setLoading(false);
  }, [id, contextProducts]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
    }
  };

  const handleSubmitReview = (rating, comment) => {
    if (product) {
      const newReview = {
        rating,
        comment,
        date: new Date().toISOString()
      };
      
      // Update the product reviews in context if available
      if (typeof updateProductReviews === 'function') {
        updateProductReviews(product.id, newReview);
      }
      
      // Also update local state to reflect changes immediately
      setProduct(prev => ({
        ...prev,
        reviews: [...(prev.reviews || []), newReview]
      }));
    }
  };

  const handleBackToShop = () => {
    navigate('/shop');
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!product) {
    return (
      <div className="product-not-found">
        <h2>Product Not Found</h2>
        <p>Sorry, the product you're looking for doesn't exist.</p>
        <button onClick={handleBackToShop} className="back-button">
          &larr; Back to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="product-detail-page">
      <button onClick={handleBackToShop} className="back-button">
        &larr; Back to Shop
      </button>
      
      <div className="product-detail-container">
        {/* Left column - Image and stats */}
        <div className="product-left-column">
          <div className="product-image">
            <img 
              src={product.image} 
              alt={product.name} 
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/images/placeholder.jpg';
              }}
            />
          </div>
          
          <div className="product-stats">
            <div className="stat-item">
              <span className="stat-label">Views</span>
              <span className="stat-value">{typeof product.views === 'string' ? product.views : `${product.views}`}</span>
            </div>
            
            <div className="stat-item">
              <span className="stat-label">Sold</span>
              <span className="stat-value">{typeof product.sold === 'string' ? product.sold : `${product.sold}`}</span>
            </div>
          </div>
        </div>
        
        {/* Right column - Product info */}
        <div className="product-info">
          <h1>{product.name}</h1>
          <p className="price">{product.price} DZ</p>
          <p className="category">
            Category: <span className="category-tag">{product.category}</span>
          </p>
          
          <button onClick={handleAddToCart} className="add-to-cart">
            <i className="ri-shopping-cart-2-line"></i> Add to Cart
          </button>
        </div>
        
        {/* Reviews section - Full width */}
        <div className="reviews-section">
          <h3>Customer Reviews</h3>
          
          {product.reviews?.length > 0 ? (
            <div className="reviews-list">
              {product.reviews.map((review, index) => (
                <div key={index} className="review-item">
                  <div className="review-rating">
                    {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                  </div>
                  <p className="review-comment">{review.comment}</p>
                  <p className="review-date">{new Date(review.date).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-reviews">No reviews yet. Be the first to review!</p>
          )}
          
          <ReviewForm onSubmit={handleSubmitReview} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;