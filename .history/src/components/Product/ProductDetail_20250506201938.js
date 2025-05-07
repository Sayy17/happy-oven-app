import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '../../context/ProductContext';
import { useCart } from '../../context/CartContext';
import ReviewForm from './ReviewForm';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, updateProductReviews } = useProducts();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const foundProduct = products.find(p => p.id === parseInt(id));
    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      navigate('/shop', { replace: true });
    }
  }, [id, products, navigate]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
    }
  };

  const handleSubmitReview = (rating, comment) => {
    if (product) {
      updateProductReviews(product.id, {
        rating,
        comment,
        date: new Date().toISOString()
      });
    }
  };

  const handleBackToShop = () => {
    navigate('/shop');
  };

  if (!product) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div id="product-detail" className="active-section">
      <button onClick={handleBackToShop} className="back-button">
        &larr; Back to Shop
      </button>
      <div className="product-detail-container">
        <div className="product-image">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="product-info">
          <h1>{product.name}</h1>
          <p className="price">{product.price} DZD</p>
          <p className="category">{product.category}</p>
          <button onClick={handleAddToCart} className="add-to-cart">
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
                    <p className="review-date">{new Date(review.date).toLocaleDateString()}</p>
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
    </div>
  );
};

export default ProductDetail;