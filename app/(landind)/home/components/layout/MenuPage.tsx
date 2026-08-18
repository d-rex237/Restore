'use client';

import MenuCard from './MenuCard';
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { menuData } from '@/lib/mock-data';
import { History, Filter } from 'lucide-react';

const recentOrderIds = ['1', '3', '5'];

const MenuPage = () => {
  const searchParams = useSearchParams();
  const urlSearchQuery = searchParams.get('q') || '';

  const [filters, setFilters] = useState({
    category: 'all',
    priceRange: 'all' as 'all' | 'low' | 'medium' | 'high',
    dietary: 'all'
  });
  const [searchQuery, setSearchQuery] = useState(urlSearchQuery);
  const dishRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const filteredItems = useMemo(() => {
    let filtered = menuData;

    if (filters.category !== 'all') {
      filtered = filtered.filter((item) =>
        item.category.toLowerCase() === filters.category
      );
    }

    // 🟢 FIXED: FCFA ranges
    if (filters.priceRange !== 'all') {
      filtered = filtered.filter((item) => {
        if (filters.priceRange === 'low') return item.price < 2000;
        if (filters.priceRange === 'medium') return item.price >= 2000 && item.price <= 4000;
        if (filters.priceRange === 'high') return item.price > 4000;
        return true;
      });
    }

    if (filters.dietary !== 'all') {
      filtered = filtered.filter((item) => {
        if (filters.dietary === 'vegetarian') return item.dietaryInfo?.isVegetarian;
        if (filters.dietary === 'vegan') return item.dietaryInfo?.isVegan;
        if (filters.dietary === 'gluten free') return item.dietaryInfo?.isGlutenFree;
        return true;
      });
    }

    if (searchQuery) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [filters, searchQuery]);

  const recentItems = useMemo(() => {
    return menuData.filter(item => recentOrderIds.includes(item.id));
  }, []);

  useEffect(() => {
    if (urlSearchQuery && filteredItems.length > 0) {
      const matchingKey = Object.keys(dishRefs.current).find(key =>
        key.toLowerCase().includes(urlSearchQuery.toLowerCase())
      );
      if (matchingKey && dishRefs.current[matchingKey]) {
        setTimeout(() => {
          dishRefs.current[matchingKey]?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }, 300);
      }
    }
  }, [filteredItems, urlSearchQuery]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <div className="relative overflow-hidden rounded-2xl mb-8 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 dark:from-orange-600 dark:via-red-600 dark:to-pink-600 p-8 text-center text-white shadow-lg">
          <h1 className="text-4xl font-bold">Discover Cameroonian Cuisine</h1>
          <p className="mt-2 text-lg opacity-90">Explore authentic flavors from across Cameroon</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <input
              type="text"
              placeholder="🔍 Search menu items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <select
              value={filters.category}
              onChange={(e) => setFilters({...filters, category: e.target.value})}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2.5 text-sm"
            >
              <option value="all">All Categories</option>
              <option value="main course">Main Course</option>
              <option value="seafood">Seafood</option>
              <option value="street food">Street Food</option>
              <option value="desserts">Desserts</option>
            </select>

            {/* 🟢 FIXED: FCFA price filter */}
            <select
              value={filters.priceRange}
              onChange={(e) => setFilters({...filters, priceRange: e.target.value as any})}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2.5 text-sm"
            >
              <option value="all">All Prices</option>
              <option value="low">Under 2000 FCFA</option>
              <option value="medium">2000 – 4000 FCFA</option>
              <option value="high">Over 4000 FCFA</option>
            </select>

            <select
              value={filters.dietary}
              onChange={(e) => setFilters({...filters, dietary: e.target.value})}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2.5 text-sm"
            >
              <option value="all">All Dietary</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="vegan">Vegan</option>
              <option value="gluten free">Gluten Free</option>
            </select>
          </div>
        </div>

        {recentItems.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-gray-300 mb-3">
              <History size={16} />
              <span>Your Recent Meals</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentItems.map((item) => (
                <MenuCard key={item.id} ref={(el) => { dishRefs.current[item.name] = el; }} item={item} />
              ))}
            </div>
          </div>
        )}

        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">All Dishes</h2>
            <span className="text-sm text-gray-500 dark:text-gray-400">{filteredItems.length} items</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <MenuCard
                key={item.id}
                ref={(el) => { dishRefs.current[item.name] = el; }}
                item={item}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuPage;