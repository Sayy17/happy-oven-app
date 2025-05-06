import React from 'react';

const BakeryBanner = () => {
  return (
    <section className="bakery-banner">
      <div className="banner-content">
        <h1 className="banner-title">FRESHLY BAKED HAPPINESS</h1>
        <div className="subtitle-box">
          <h2 className="banner-subtitle">Charm & Crust</h2>
        </div>
        <p className="banner-description">
          Indulge in our artisanal breads, cakes, and pastries made with love and the finest ingredients.
        </p>
        <a href="#shop" className="btn">
          Order Now! <i className="ri-arrow-right-line"></i>
        </a>
      </div>
    </section>
  );
};

export default BakeryBanner;