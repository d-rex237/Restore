'use client';

import React, { useState } from 'react';
import { MenuItem } from '@/lib/types';
import { useCart } from '@/lib/cart-context';

interface MenuCardProps {
  item: MenuItem;
}

const MenuCard = ({ item }: MenuCardProps) => {
  const [quantity, setQuantity] = useState<number>(1);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(item, quantity);
    alert(`Added ${quantity} ${item.name} to cart!`);
  };

  return (
    <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:-translate-y-1">
      
      {/* Image Section */}
      <div className="relative h-48 bg-gray-100 dark:bg-gray-700 overflow-hidden">
        <img 
          src={item.image || '/images/placeholder-food.jpg'} 
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        {item.isPopular && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
            🔥 Popular
          </div>
        )}
        {item.dietaryInfo?.isVegetarian && (
          <div className="absolute top-3 right-3 bg-green-500 text-white px-2.5 py-1 rounded-full text-xs font-semibold shadow-lg">
            🌱 Veg
          </div>
        )}
        {item.dietaryInfo?.isVegan && (
          <div className="absolute bottom-3 right-3 bg-emerald-600 text-white px-2.5 py-1 rounded-full text-xs font-semibold shadow-lg">
            Vegan
          </div>
        )}
        {item.dietaryInfo?.isGlutenFree && (
          <div className="absolute bottom-3 left-3 bg-blue-500 text-white px-2.5 py-1 rounded-full text-xs font-semibold shadow-lg">
            GF
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white line-clamp-1">
            {item.name}
          </h3>
          <span className="text-lg font-bold text-orange-600 dark:text-orange-400 whitespace-nowrap ml-2">
            {item.price.toLocaleString()} FCFA
          </span>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
          {item.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-3">
          <span className="inline-flex items-center gap-1 text-xs bg-gray-100 dark:bg-gray-700 px-2.5 py-1 rounded-full text-gray-600 dark:text-gray-300">
            ⏱️ {item.preparationTime || 20}min
          </span>
          <span className="inline-flex items-center gap-1 text-xs bg-gray-100 dark:bg-gray-700 px-2.5 py-1 rounded-full text-gray-600 dark:text-gray-300">
            {item.category}
          </span>
        </div>

        <div className="mb-4">
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">
            Ingredients:
          </p>
          <div className="flex flex-wrap gap-1">
            {item.ingredients && item.ingredients.slice(0, 4).map((ingredient, index) => (
              <span key={index} className="text-xs bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 px-2 py-0.5 rounded-full">
                {ingredient}
              </span>
            ))}
            {item.ingredients && item.ingredients.length > 4 && (
              <span className="text-xs text-gray-400 dark:text-gray-500">
                +{item.ingredients.length - 4}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-3 py-1.5 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-l-lg transition-colors text-gray-700 dark:text-gray-300"
              type="button"
            >
              −
            </button>
            <span className="px-3 py-1.5 min-w-[2.5rem] text-center font-medium text-gray-700 dark:text-gray-300">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-3 py-1.5 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-r-lg transition-colors text-gray-700 dark:text-gray-300"
              type="button"
            >
              +
            </button>
          </div>
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
            type="button"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;