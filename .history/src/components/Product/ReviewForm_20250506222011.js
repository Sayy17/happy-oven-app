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
              {/* Use span with proper styling to ensure stars display correctly */}
              <span>{rating >= star ? '★' : '☆'}</span>
            </button>
          ))}
        </div>
      </div>
      
      <div className="your-review-text">Your Review:</div>
      <div className="form-group">
        <textarea
          placeholder="Share your thoughts about this product..."
          rows="4"
          required
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
      </div>
            
      <button type="submit" className="submit-review-btn">
        Submit Review
      </button>
    </form>
  );
};

export default ReviewForm;