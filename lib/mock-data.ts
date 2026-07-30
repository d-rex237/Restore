// src/lib/mock-data.ts

export const menuData = [
  {
    id: '1',
    name: 'Ndolé',
    description: 'Classic Cameroonian dish with bitter leaves, peanuts, and tender beef.',
    price: 3500, 
    category: 'Main Course',
    preparationTime: 30,
    ingredients: ['Bitter leaves', 'Peanuts', 'Beef', 'Onions', 'Garlic'],
    isPopular: true,
    image: '/images/ndole.webp',
    dietaryInfo: { isVegetarian: false, isVegan: false, isGlutenFree: true }
  },
  {
    id: '2',
    name: 'Eru Soup',
    description: 'Rich, hearty soup made with water leaves, okra, and smoked fish.',
    price: 3000, 
    category: 'Main Course',
    preparationTime: 25,
    ingredients: ['Water leaves', 'Okra', 'Smoked fish', 'Palm oil', 'Pepper'],
    isPopular: true,
    image: '/images/fufu-and-eru.webp',
    dietaryInfo: { isVegetarian: false, isVegan: false, isGlutenFree: true }
  },
  {
    id: '3',
    name: 'Miondo',
    description: 'Soft cassava sticks served with a flavorful, spicy peanut sauce.',
    price: 1500, 
    category: 'Street Food',
    preparationTime: 15,
    ingredients: ['Cassava', 'Peanuts', 'Pepper', 'Salt'],
    isPopular: false,
    image: '/images/miondo.webp',
    dietaryInfo: { isVegetarian: true, isVegan: true, isGlutenFree: true }
  },
  {
    id: '4',
    name: 'Grilled Tilapia',
    description: 'Fresh tilapia grilled to perfection with local spices and lemon.',
    price: 4000, 
    category: 'Seafood',
    preparationTime: 20,
    ingredients: ['Tilapia', 'Lemon', 'Garlic', 'Onions', 'Spices'],
    isPopular: true,
    image: '/images/grilled-tilapia.webp',
    dietaryInfo: { isVegetarian: false, isVegan: false, isGlutenFree: true }
  },
  {
    id: '5',
    name: 'Plantain & Stew',
    description: 'Fried ripe plantains served with a rich tomato and pepper stew.',
    price: 2000, 
    category: 'Street Food',
    preparationTime: 10,
    ingredients: ['Plantains', 'Tomatoes', 'Onions', 'Peppers'],
    isPopular: false,
    image: '/images/plantain-and-stew.webp',
    dietaryInfo: { isVegetarian: true, isVegan: true, isGlutenFree: true }
  },
  {
    id: '6',
    name: 'Cameroonian Pepper Soup',
    description: 'Spicy, aromatic broth with chunks of beef or fish, perfect for a cold day.',
    price: 2500, 
    category: 'Appetizers',
    preparationTime: 25,
    ingredients: ['Beef', 'Pepper', 'Onions', 'Garlic', 'Ginger'],
    isPopular: false,
    image: '/images/pepper-soup.webp',
    dietaryInfo: { isVegetarian: false, isVegan: false, isGlutenFree: true }
  },
  {
    id: '7',
    name: 'Beef Stew with Rice',
    description: 'Tender beef simmered in a rich tomato-based stew, served with white rice.',
    price: 3500, 
    category: 'Main Course',
    preparationTime: 30,
    ingredients: ['Beef', 'Tomatoes', 'Rice', 'Onions', 'Thyme'],
    isPopular: true,
    image: '/images/rice-and-stew.webp',
    dietaryInfo: { isVegetarian: false, isVegan: false, isGlutenFree: true }
  },
  {
    id: '8',
    name: 'Puff Puff',
    description: 'Sweet, fluffy fried dough balls, a perfect snack or dessert.',
    price: 1000, 
    category: 'Desserts',
    preparationTime: 20,
    ingredients: ['Flour', 'Sugar', 'Yeast', 'Nutmeg', 'Oil'],
    isPopular: true,
    image: '/images/puff-puff.webp',
    dietaryInfo: { isVegetarian: true, isVegan: true, isGlutenFree: false }
  },
  {
    id: '9',
    name: 'Fried Rice',
    description: 'Savory fried rice loaded with mixed vegetables, juicy shrimp, and flavorful local spices.',
    price: 3000, 
    category: 'Main Course',
    preparationTime: 20,
    ingredients: ['Rice', 'Shrimp', 'Carrots', 'Green peas', 'Onions', 'Spices'],
    isPopular: true,
    image: '/images/fried-rice.webp',
    dietaryInfo: { isVegetarian: false, isVegan: false, isGlutenFree: true }
  }
];