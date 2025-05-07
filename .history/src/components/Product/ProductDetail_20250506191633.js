import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '../../context/ProductContext';
import { useCart } from '../../context/CartContext';
import ReviewForm from './ReviewForm';
import products from '../../data/products';

const ProductDetail = ({ showNotification }) => {
  // ... [keep all your existing state and effect hooks] ...

  return (
    <div className="product-detail-page">
      <button onClick={handleBackToShop} className="back-button">
        &larr; Back to Shop
      </button>
      
      <div className="product-detail-container">
        <div className="product-image-wrapper">
          <img 
            src={product.image} 
            alt={product.name}
            className="product-main-image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/images/placeholder.jpg';
            }}
          />
        </div>
        
        <div className="product-info-section">
          <h1 className="product-title">{product.name}</h1>
          
          <div className="product-meta">
            <p className="product-price">{product.price} DZ</p>
            <div className="stats">
              <span>Views: {product.views}</span>
              <span>Sold: {product.sold}</span>
              <span>Category: {product.category}</span>
            </div>
          </div>
          
          <button onClick={handleAddToCart} className="add-to-cart-btn">
            Add to Cart
          </button>
          
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
                    <p className="review-date">
                      {new Date(review.date).toLocaleDateString()}
                    </p>
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
    </div>
  );
};

export default ProductDetail;