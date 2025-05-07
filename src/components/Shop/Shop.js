import React, { useState, useEffect, useRef } from 'react';
import CategoryButtons from './CategoryButtons';
import ProductGrid from './ProductGrid';
import SearchComponent from './SearchComponent';
import { useProducts } from '../../context/ProductContext';
import productsData from '../../data/products'; // Import the data directly

const Shop = () => {
  const { 
    products: contextProducts,
    getProductsByCategory,
    incrementProductViews 
  } = useProducts();
  
  const [activeCategory, setActiveCategory] = useState('all');
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const shopSectionRef = useRef(null);

  
  useEffect(() => {
    setIsLoading(true);
    
    // Use imported products as fallback if context is empty
    const productsToUse = contextProducts && contextProducts.length > 0 
      ? contextProducts 
      : productsData;
      
    const filteredProducts = activeCategory === 'all' 
      ? productsToUse 
      : productsToUse.filter(product => product.category === activeCategory);
      
    setDisplayedProducts(filteredProducts);
    setIsLoading(false);
  }, [activeCategory, contextProducts]);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  const handleSearch = (searchResults) => {
    setDisplayedProducts(searchResults);
  };
  
  const handleProductClick = (productId) => {
    // If using context method for tracking views
    if (typeof incrementProductViews === 'function') {
      incrementProductViews(productId);
    }
    
    // Log for debugging
    console.log(`Product ${productId} clicked`);
  };

  return (
    <section id="shop" className="shop-section" ref={shopSectionRef}>
      <div className="container">
        <h2 className="section-title">Fill your Box</h2>
        
        <SearchComponent 
          onSearch={handleSearch} 
          activeCategory={activeCategory}
        />
        
        <CategoryButtons
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />
        
        {isLoading ? (
          <div className="loading">Loading products...</div>
        ) : (
          <ProductGrid 
            products={displayedProducts} 
            onProductClick={handleProductClick}
          />
        )}
      </div>
    </section>
  );
};

export default Shop;
