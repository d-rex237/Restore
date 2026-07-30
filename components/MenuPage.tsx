'use client';
import MenuCard from './MenuCard';
import React, { useState, useMemo } from 'react';
// Since there is no 'types' file in this repo, we define the types right here
import { menuData } from '@/lib/mock-data'; // We will use the existing mock-data file!

interface FilterOptions {
  category: string;
  priceRange: 'all' | 'low' | 'medium' | 'high';
  dietary: string;
}

const MenuPage = () => {
  const [filters, setFilters] = useState<FilterOptions>({
    category: 'all',
    priceRange: 'all',
    dietary: 'all'
  });

  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter + Search Logic
  const filteredItems = useMemo(() => {
    let filtered = menuData; // Using the mock data from the cloned repo

    // Category filter
    if (filters.category !== 'all') {
      filtered = filtered.filter((item) => 
        item.category.toLowerCase() === filters.category
      );
    }

    // Price filter
    if (filters.priceRange !== 'all') {
      filtered = filtered.filter((item) => {
        if (filters.priceRange === 'low') return item.price < 10;
        if (filters.priceRange === 'medium') return item.price >= 10 && item.price <= 15;
        if (filters.priceRange === 'high') return item.price > 15;
        return true;
      });
    }

    // Dietary filter
    if (filters.dietary !== 'all') {
      filtered = filtered.filter((item) => {
        if (filters.dietary === 'vegetarian') return item.dietaryInfo?.isVegetarian;
        if (filters.dietary === 'vegan') return item.dietaryInfo?.isVegan;
        if (filters.dietary === 'gluten free') return item.dietaryInfo?.isGlutenFree;
        return true;
      });
    }

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter((item) => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [filters, searchQuery]);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Menu Header */}
        <div className="relative overflow-hidden rounded-2xl mb-8 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 dark:from-orange-600 dark:via-red-600 dark:to-pink-600 p-8 text-center text-white">
          <h1 className="text-4xl font-bold">Discover Cameroonian Cuisine</h1>
          <p className="mt-2 text-lg opacity-90">Explore authentic flavors from across Cameroon</p>
        </div>

        {/* Search Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <input
              type="text"
              placeholder="🔍 Search menu items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[var(--surface)] border-[var(--border)] text-[var(--foreground)] rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-colors"
            />
          </div>
          
          {/* Filters Dropdowns */}
          <div className="flex gap-2 flex-wrap">
            <select
              value={filters.category}
              onChange={(e) => setFilters({...filters, category: e.target.value})}
              className="bg-[var(--surface)] border-[var(--border)] rounded-lg px-3 py-2.5"
            >
              <option value="all">All Categories</option>
              <option value="main course">Main Course</option>
              <option value="seafood">Seafood</option>
              <option value="street food">Street Food</option>
              <option value="desserts">Desserts</option>
            </select>

            <select
              value={filters.priceRange}
              onChange={(e) => setFilters({...filters, priceRange: e.target.value as any})}
              className="bg-[var(--surface)] border-[var(--border)] rounded-lg px-3 py-2.5"
            >
              <option value="all">All Prices</option>
              <option value="low">Under $10</option>
              <option value="medium">$10 - $15</option>
              <option value="high">$15+</option>
            </select>
          </div>
        </div>

        {/* Results count */}
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-[var(--foreground)]">Our Menu</h2>
          <span className="text-sm text-gray-500 dark:text-gray-400">{filteredItems.length} items found</span>
        </div>

        {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
              
        </div>
      </div>
    </div>
  );
}


export default MenuPage;