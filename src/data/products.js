// src/data/products.js
const products = [
  // cookies Category
  {
    id: 1,
    name: "Caramel Popcorn Cookie",
    image: "/images/caramel popcorn cookies.jpg",
    price: 100,
    category: "cookies",
    sold: "1.2K",
    views: "4.3K",
    reviews: []
  },
  {
    id: 2,
    name: "Lemon Cookie",
    image: "/images/lemon cookies.jpg",
    price: 100,
    category: "cookies",
    sold: "893",
    views: "3.1K",
    reviews: []
  },
  {
    id: 3,
    name: "Chocolate Cookie",
    image: "/images/choclate cookies.jpg",
    price: 100,
    category: "cookies",
    sold: "1.5K",
    views: "5.2K",
    reviews: []
  },
  {
    id: 4,
    name: "Mint Chip Cookie",
    image: "/images/mint cookies.jpg",
    price: 100,
    category: "cookies",
    sold: "975",
    views: "3.8K",
    reviews: []
  },
  {
      id: 5,
      name: "Tropical Cookie",
      image: "/images/tro.jpg", 
      price: 300,
      category: "cookies",
      sold: "763",
      views: "2.6K",
      reviews: []

  },
  {
    id: 6,
    name: "Strawberry Cookie",
    image: "/images/pink cookies.jpg",
    price: 100,
    category: "cookies",
    sold: "1.1K",
    views: "4.7K",
    reviews: []
  },
  
  // savory foods category
  {
    id: 7,
    name: "Bread with Salmon",
    image: "/images/salee salmon.jpg",
    price: 400,
    category: "savory foods",
    sold: "2.4K",
    views: "7.9K",
    reviews: []
  },
  {
    id: 8,
    name: "Croissant Salée",
    image: "/images/croissant salee.jpg",
    price: 400,
    category: "savory foods",
    sold: "3.2K",
    views: "9.1K",
    reviews: []
  },
  {
    id: 9,
    name: "Quiche",
    image: "/images/qiche.jpg",
    price: 200,
    category: "savory foods",
    sold: "1.8K",
    views: "6.5K",
    reviews: []
  },
  {
    id: 10,
    name: "Starter",
    image: "/images/BASKET.jpg",
    price: 500,
    category: "savory foods",
    sold: "842",
    views: "3.3K",
    reviews: []
  },
  {
    id: 11,
    name: "Mini Burger",
    image: "/images/SANDWICH.jpg",
    price: 350,
    category: "savory foods",
    sold: "2.7K",
    views: "8.4K",
    reviews: []
  },
  {
    id: 12,
    name: "Vegetarian Burger",
    image: "/images/SANDWISH.jpg",
    price: 400,
    category: "savory foods",
    sold: "1.9K",
    views: "5.8K",
    reviews: []
  },
  
  // pastries category
  {
    id: 13,
    name: "Macarons",
    image: "/images/pink macarons.jpg",
    price: 120,
    category: "pastries",
    sold: "4.6K",
    views: "12.3K",
    reviews: []
  },
  {
    id: 14,
    name: "Mint Macarons",
    image: "/images/mint macarons.jpg",
    price: 120,
    category: "pastries",
    sold: "3.8K",
    views: "10.5K",
    reviews: []
  },
  {
    id: 15,
    name: "Croissant",
    image: "/images/croissant.jpg",
    price: 20,
    category: "pastries",
    sold: "7.8K",
    views: "19.3K",
    reviews: []
  },
  {
    id: 16,
    name: "Petitpain",
    image: "/images/petitpain.jpg",
    price: 20,
    category: "pastries",
    sold: "5.2K",
    views: "14.7K",
    reviews: []
  },
  {
    id: 17,
    name: "Newyork Rolls",
    image: "/images/new york.jpg",
    price: 450,
    category: "pastries",
    sold: "2.1K",
    views: "7.2K",
    reviews: []
  },
  {
    id: 18,
    name: "Pavlova",
    image: "/images/nsito.jpg",
    price: 450,
    category: "pastries",
    sold: "1.4K",
    views: "4.9K",
    reviews: []
  },
  {
    id: 19,
    name: "Brownies",
    image: "/images/brownies.jpg",
    price: 250,
    category: "pastries",
    sold: "3.5K",
    views: "9.8K",
    reviews: []
  },
  {
    id: 20,
    name: "Coffee Donuts",
    image: "/images/coffe donuts.jpg",
    price: 350,
    category: "pastries",
    sold: "2.9K",
    views: "8.6K",
    reviews: []
  },
  {
    id: 21,
    name: "Oreo Donuts",
    image: "/images/oreo donuts.jpg",
    price: 350,
    category: "pastries",
    sold: "3.3K",
    views: "10.1K",
    reviews: []
  },
  
  // cakes category
  {
    id: 22,
    name: "Raspberry Cake",
    image: "/images/frambowes.jpg",
    price: 250,
    category: "cakes",
    sold: "2.8K",
    views: "9.4K",
    reviews: []
  },
  {
    id: 23,
    name: "Lemon Cake",
    image: "/images/lemon tart.jpg",
    price: 250,
    category: "cakes",
    sold: "2.3K",
    views: "7.6K",
    reviews: []
  },
  {
    id: 24,
    name: "Oreo Cake",
    image: "/images/oreo cookies.jpg",
    price: 250,
    category: "cakes",
    sold: "4.1K",
    views: "13.7K",
    reviews: []
  },
  {
    id: 25,
    name: "Pistachio Cake",
    image: "/images/pistachio cake.jpg",
    price: 250,
    category: "cakes",
    sold: "1.7K",
    views: "5.3K",
    reviews: []
  },
  {
    id: 26,
    name: "Speculoos Cake",
    image: "/images/lotus cake.jpg",
    price: 250,
    category: "cakes",
    sold: "3.6K",
    views: "11.2K",
    reviews: []
  },
  {
    id: 27,
    name: "Chocolate Cake",
    image: "/images/choclate cake.jpg",
    price: 250,
    category: "cakes",
    sold: "5.9K",
    views: "16.8K",
    reviews: []
  },
  {
    id: 28,
    name: "Tiramisu",
    image: "/images/teramissu.jpg",
    price: 250,
    category: "cakes",
    sold: "4.7K",
    views: "14.1K",
    reviews: []
  }
];

export default products;
