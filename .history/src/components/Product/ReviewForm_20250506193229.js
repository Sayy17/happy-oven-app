import React, { useState } from 'react';

const ReviewForm = ({ onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  
  const handleStarClick = (selectedRating) => {
    setRating(selectedRating);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (rating === 0 || comment.trim() === '') {
      alert('Please provide both a rating and a comment');
      return;
    }
    
    onSubmit(rating, comment);
    setSubmitted(true);
    
    setTimeout(() => {
      setRating(0);
      setComment('');
      setSubmitted(false);
    }, 3000);
  };
  
  if (submitted) {
    return (
      <div className="review-success">
        <p>Thank you for your review!</p>
      </div>
    );
  }
  
  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <h4 className="review-form-title">Share Your Experience</h4>
      
      <div className="rating-stars">
        <label>Your Rating:</label>
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
      
      <div className="form-group">
        <label htmlFor="review-message">Your Review</label>
        <textarea
          id="review-message"
          placeholder="Share your thoughts about this product..."
          rows="4"
          required
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
      </div>
            
      <button type="submit" className="submit-review-btn">
        Submit Review <i className="ri-send-plane-fill"></i>
      </button>
    </form>
  );
};

export default ReviewForm;