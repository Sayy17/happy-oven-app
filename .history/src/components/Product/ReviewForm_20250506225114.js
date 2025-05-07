import React, { useState } from 'react';

const ReviewForm = ({ onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  
  const handleStarClick = (selectedRating) => {
    setRating(selectedRating);
    setError(''); // Clear any error when user selects a rating
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (rating === 0) {
      setError('Please select a star rating');
      return;
    }
    
    if (comment.trim() === '') {
      setError('Please enter a review comment');
      return;
    }
    
    // Submit review
    onSubmit(rating, comment);
    setSubmitted(true);
    
    // Reset form after submission
    setTimeout(() => {
      setRating(0);
      setComment('');
      setSubmitted(false);
      setError('');
    }, 3000);
  };
  
  if (submitted) {
    return (
      <div className="review-success">
        <p>Thank you for your review!</p>
        <div className="review-rating">
          {[1, 2, 3, 4, 5].map((star) => (
            <span 
              key={star} 
              className="review-star"
            >
              {star <= rating ? '★' : '☆'}
            </span>
          ))}
        </div>
      </div>
    );
  }
  
  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <div className="your-rating-text">Your Rating:</div>
      <div className="rating-stars">
        <div className="stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              type="button"
              key={star}
              className={`star ${rating >= star ? 'filled' : ''}`}
              onClick={() => handleStarClick(star)}
              aria-label={`Rate ${star} star${star !== 1 ? 's' : ''}`}
            >
              {rating >= star ? '★' : '☆'}
            </button>
          ))}
        </div>
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="your-review-text">Your Review</div>
      <div className="form-group">
        <textarea
          placeholder="Share your thoughts about this product..."
          rows="4"
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
            if (e.target.value.trim() !== '') setError('');
          }}
        ></textarea>
      </div>
            
      <button type="submit" className="submit-review-btn">
        Submit Review
      </button>
    </form>
  );
};

export default ReviewForm;