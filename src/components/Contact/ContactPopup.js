import React, { useState, useEffect } from 'react';
import brandImage from '../../assets/images/brand.jpg';

const ContactPopup = ({ isOpen, toggleContact }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setImageError(false);
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id.replace('contact-', '')]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    toggleContact(false);
  };

  const handleOverlayClick = (e) => {
    if (e.target.id === 'contact-popup-overlay') {
      toggleContact(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className={`contact-popup-overlay ${isOpen ? 'active' : ''}`} 
      id="contact-popup-overlay"
      onClick={handleOverlayClick}
    >
      <div className="contact-popup">
        <div className="contact-popup-header">
          <h2>Get in touch!</h2>
          <button 
            className="close-contact" 
            onClick={() => toggleContact(false)}
            aria-label="Close contact form"
          >
            <i className="ri-close-line"></i>
          </button>
        </div>
        
        <div className="contact-popup-content">
          <div className="contact-container">
            <div className="contact-intro">
              <div className="contact-image">
                <img 
                  src={brandImage} 
                  alt="Happy Oven" 
                  className="contact-img" 
                  onError={() => setImageError(true)}
                />
              </div>
              <p>
                We'd love to hear from you! Fill out the form and our team will 
                get back to you as soon as possible.
              </p>
            </div>
            
            <form id="contact-form" className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="contact-name">Full Name</label>
                  <input 
                    type="text" 
                    id="contact-name" 
                    required 
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="contact-email">Email Address</label>
                  <input 
                    type="email" 
                    id="contact-email" 
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="contact-phone">Phone Number (Optional)</label>
                <input 
                  type="tel" 
                  id="contact-phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="contact-subject">Subject</label>
                <select 
                  id="contact-subject" 
                  required
                  value={formData.subject}
                  onChange={handleChange}
                >
                  <option value="" disabled>Select a topic</option>
                  <option value="order">Order Questions</option>
                  <option value="product">Product Questions</option>
                  <option value="feedback">Event Inquiries</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="contact-message">Message</label>
                <textarea 
                  id="contact-message" 
                  rows="5" 
                  required
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>
              
              <button type="submit" className="contact-submit-btn">
                Submit
                <i className="ri-send-plane-fill"></i>
              </button>
            </form>
          </div>
          
          <div className="contact-info">
            <div className="contact-item">
              <i className="ri-mail-line"></i>
              <div>
                <h3>Email Us</h3>
                <p>contact@happyoven.com</p>
              </div>
            </div>
            
            <div className="contact-item">
              <i className="ri-phone-line"></i>
              <div>
                <h3>Call Us</h3>
                <p>xxxxxxxxxx</p>
              </div>
            </div>
            
            <div className="contact-item">
              <i className="ri-map-pin-line"></i>
              <div>
                <h3>Visit Us</h3>
                <p>Central uni, Algiers</p>
              </div>
            </div>
            
            <div className="social-links">
              <a href="#" className="social-link"><i className="ri-facebook-fill"></i></a>
              <a href="#" className="social-link"><i className="ri-instagram-line"></i></a>
              <a href="#" className="social-link"><i className="ri-twitter-x-line"></i></a>
              <a href="#" className="social-link"><i className="ri-pinterest-line"></i></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPopup;