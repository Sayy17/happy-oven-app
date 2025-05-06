import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Reusable team member card
const TeamMember = ({ icon, name, role, backInfo }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="team-member"
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={() => setFlipped(!flipped)}
    >
      <div
        className="team-card"
        style={{ transform: flipped ? 'rotateY(180deg)' : 'rotateY(0)' }}
      >
        <div className="team-front">
          <div className="team-icon">{icon}</div>
          <h4 className="team-name">{name}</h4>
          <p className="team-role">{role}</p>
        </div>
        <div className="team-back">
          <p>{backInfo}</p>
        </div>
      </div>
    </div>
  );
};

const AboutUs = () => {
  const aboutSectionRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const animatedElements = entry.target.querySelectorAll('.fade-in-up');
            animatedElements.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add('animated');
              }, index * 200);
            });

            const teamGrid = entry.target.querySelector('.team-grid');
            if (teamGrid) {
              setTimeout(() => {
                teamGrid.classList.add('animated');
              }, 400);
            }

            const ctaButton = entry.target.querySelector('.explore-cta');
            if (ctaButton) {
              setTimeout(() => {
                ctaButton.classList.add('animated');
              }, animatedElements.length * 200 + 200);
            }
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -300px 0px' }
    );

    if (aboutSectionRef.current) {
      observer.observe(aboutSectionRef.current);
    }

    return () => observer.disconnect(); // Cleanup
  }, []);

  const goToShop = () => {
    navigate('/shop');
  };

  return (
    <section className="about-us-section" ref={aboutSectionRef}>
      <div className="container">
        <button className="back-to-shop" onClick={goToShop}>
          <i className="ri-arrow-left-line"></i> Back to Shop
        </button>

        <h2 className="section-title">About us</h2>

        <p className="fade-in-up">Welcome to Happy Oven E-Commerce!</p>

        <h3 className="fade-in-up">Our Development Journey</h3>
        <p className="fade-in-up">
          Founded in 2025, Happy Oven was born during our web development coursework as we combined
          our technical expertise with the vision of creating an intuitive online bakery platform.
        </p>

        <h3 className="fade-in-up">Meet Our Team</h3>

        <div className="team-grid fade-in-up">
          <TeamMember icon="☕" name="Sarah Haddad" role="Developer" backInfo="Section B Group 2" />
          <TeamMember icon="🧁" name="Aya Gattal" role="Developer" backInfo="Section B Group 2" />
          <TeamMember icon="🍞" name="Naima Labbas" role="Developer" backInfo="Section B Group 2" />
        </div>

        <h3 className="fade-in-up">Discover Our Work</h3>

        <p className="fade-in-up">
          We encourage you to browse our platform to experience the features we've implemented.
        </p>

        <p className="fade-in-up">
          We invite you to explore our platform's features and functionality, representing the
          culmination of our academic learning and practical application.
        </p>

        <button className="explore-cta fade-in-up" onClick={goToShop}>
          Explore Our Menu
        </button>
      </div>
    </section>
  );
};

export default AboutUs;