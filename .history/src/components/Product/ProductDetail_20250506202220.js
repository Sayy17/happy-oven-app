import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext'; // Assuming you have a CartContext

const ProductDetail = ({ product, onBack }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const { addToCart } = useCart(); // Get addToCart function from cart context
  
  // If no product is passed, show a placeholder or return null
  if (!product) {
    return (
      <div className="product-detail-section" id="product-sec">
        <button className="go-back" onClick={onBack}>← Go Back</button>
        <div className="product-detail">
          <p>Select a product to view details</p>
        </div>
      </div>
    );
  }

  // Handle star rating selection
  const handleStarClick = (selectedRating) => {
    setRating(selectedRating);
  };

  // Handle review submission
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    
    if (!rating || !comment.trim()) {
      alert('Please provide both a rating and a comment');
      return;
    }
    
    // Initialize reviews array if it doesn't exist
    if (!product.reviews) {
      product.reviews = [];
    }
    
    // Add the review
    product.reviews.push({ rating, comment });
    
    // Reset form
    setRating(0);
    setComment('');
    
    alert('Thank you for your review!');
  };

  return (
    <section className="product-detail-section" id="product-sec">
      <button className="go-back" onClick={onBack}>← Go Back</button>
      
      <div className="product-detail">
        <img 
          id="detail-image" 
          src={product.image} 
          alt={product.name} 
          onError={(e) => {e.target.src = 'croissant.png'}} // Fallback image
        />
        
        <h2 id="detail-name">{product.name}</h2>
        <p id="detail-price">{product.price} DZ</p>
        <p id="detail-views">Views: {product.views || 0}</p>
        <p id="detail-sold">Sold: {product.sold || 0}</p>
        
        <button 
          className="add-to-cart-detail"
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </button>
        
        <div className="reviews">
          <h3>Customer Reviews</h3>
          
          {/* Display existing reviews */}
          {product.reviews && product.reviews.length > 0 && (
            <ul className="reviews-list" id="reviews-list">
              {product.reviews.map((review, index) => (
                <li key={index}>⭐ {review.rating} - {review.comment}</li>
              ))}
            </ul>
          )}
          
          {/* Review Form */}
          <div className="review-form">
            <div className="rating-stars">
              <label>Your Rating:</label>
              <div className="stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <i 
                    key={star}
                    className={`${rating >= star ? 'ri-star-fill' : 'ri-star-line'} star`}
                    data-rating={star}
                    onClick={() => handleStarClick(star)}
                  ></i>
                ))}
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="review-message">Your Review</label>
              <textarea 
                id="review-message" 
                placeholder="Share your thoughts about this product..." 
                rows="4"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              className="submit-review-btn"
              onClick={handleReviewSubmit}
            >
              Submit Review <i className="ri-send-plane-fill"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;