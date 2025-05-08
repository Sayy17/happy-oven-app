import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '../../context/ProductContext';
import { useCart } from '../../context/CartContext';
import ReviewForm from './ReviewForm';
import products from '../../data/products'; // Import products data as fallback

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { 
    products: contextProducts, 
    updateProductReviews, 
    incrementProductViews 
  } = useProducts();
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
      
      // Check if this product has been viewed in this session
      const viewedProducts = JSON.parse(sessionStorage.getItem('viewedProducts') || '[]');
      
      // If the product hasn't been viewed in this session, increment the view count
      if (!viewedProducts.includes(parsedId)) {
        // Add the product ID to the viewed products list
        viewedProducts.push(parsedId);
        sessionStorage.setItem('viewedProducts', JSON.stringify(viewedProducts));
        
        // Increment view count
        if (typeof incrementProductViews === 'function') {
          incrementProductViews(parsedId);
          console.log(`Incremented view count for product: ${foundProduct.name}`);
        }
      } else {
        console.log(`Product ${foundProduct.name} already viewed in this session`);
      }
    } else {
      console.log("Product not found, redirecting to shop");
    }
    
    setLoading(false);
  }, [id, contextProducts, incrementProductViews]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      // Show a brief notification if desired
      alert('Added to cart!');
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

  // Helper function to render star ratings
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className="review-star">
          {i <= rating ? '★' : '☆'}
        </span>
      );
    }
    return stars;
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
        <div className="product-info">
          <h1>{product.name}</h1>
          <p className="price">{product.price} DZ</p>
          
          <p className="views">Views: {product.views || 0}</p>
          <p className="sold">Sold: {product.sold || 0}</p>
          <p className="category">Category: {product.category}</p>
          
          <button onClick={handleAddToCart} className="add-to-cart">
            Add to Cart
          </button>
        </div>
        
        <div className="reviews-section">
          <h3>Customer Reviews</h3>
          {product.reviews && product.reviews.length > 0 ? (
            <div className="reviews-list">
              {product.reviews.map((review, index) => (
                <div key={index} className="review-item">
                  <div className="review-rating">
                    {renderStars(review.rating)}
                  </div>
                  <p className="review-comment">{review.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No reviews yet. Be the first to review!</p>
          )}
          
          <ReviewForm onSubmit={handleSubmitReview} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
