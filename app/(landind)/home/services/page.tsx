"use client";

import { useRouter } from "next/navigation";
import React from "react";
import "./ServicesPage.css";

const ServicesPage: React.FC = () => {
 const router = useRouter();

  // Navigation handlers
  const handleBrowseMenu = () => {
    router.push("/home/menu");
  };

  const handleOrderNow = () => {
    router.push("/home/cart");
  };

  const handleContactUs = () => {
    router.push("/home/contact");
  };

  
  return (
    <div className="services-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Our Services</h1>
          <p className="hero-subtitle">Delicious Food. Delivered with Care.</p>
          <p className="hero-description">
            We offer convenient ways to enjoy high-quality, hygienically
            prepared meals—whether at home or on the go.
          </p>
        </div>
        <img
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&h=400&fit=crop&auto=format"
          alt="Delicious food spread"
          className="hero-image"
        />
      </section>

      {/* What We Offer */}
      <section className="what-we-offer">
        <div className="container">
          <h2 className="section-title">WHAT WE OFFER</h2>
          <div className="offer-grid">
            <div className="offer-item">
              <img
                src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&h=400&fit=crop&auto=format"
                alt="Cooked Food"
                className="offer-image"
              />
              <h3>Cooked Meals & Fast Food</h3>
              <p>
                Browse our menu and order your favorite home-cooked meals.
                Prepared with fresh ingredients and the best recipes to satisfy
                your cravings.
              </p>
              <ul>
                <li>Wide variety of delicious meals</li>
                <li>Made fresh daily</li>
                <li>Safe, hygienic & high quality</li>
              </ul>
              <button className="btn btn-primary" onClick={handleBrowseMenu}>
                Browse Menu
              </button>
            </div>
            <div className="offer-item">
              <img
                src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=400&fit=crop&auto=format"
                alt="Food Delivery"
                className="offer-image"
              />
              <h3>Food Delivery</h3>
              <p>
                We deliver your meals hot and fresh right to your doorstep.
                Fast, reliable, and right on time.
              </p>
              <ul>
                <li>Fast & reliable delivery</li>
                <li>Live order tracking</li>
                <li>Delivered hot & fresh</li>
              </ul>
              <button className="btn btn-primary" onClick={handleOrderNow}>
                Order Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Help Section */}
      <section className="help-section">
        <div className="container">
          <div className="help-content">
            <img
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop&auto=format"
              alt="Customer support"
              className="help-image"
            />
            <div className="help-text">
              <h2>Have questions or special requests? We're here to help!</h2>
              <button className="btn btn-secondary" onClick={handleContactUs}>
                  Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="features-grid">
            <div className="feature-item">
              <img
                src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop&auto=format"
                alt="Fresh Ingredients"
                className="feature-image"
              />
              <h3>Fresh Ingredients</h3>
              <p>We use only the freshest and highest quality ingredients.</p>
            </div>
            <div className="feature-item">
              <img
                src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=600&h=400&fit=crop&auto=format"
                alt="Hygienic Preparation"
                className="feature-image"
              />
              <h3>Hygienic Preparation</h3>
              <p>Prepared with care in clean and safe environments.</p>
            </div>
            <div className="feature-item">
              <img
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop&auto=format"
                alt="On-Time Delivery"
                className="feature-image"
              />
              <h3>On-Time Delivery</h3>
              <p>Your time matters. We deliver as promised.</p>
            </div>
            <div className="feature-item">
              <img
                src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&h=400&fit=crop&auto=format"
                alt="Customer Satisfaction"
                className="feature-image"
              />
              <h3>Customer Satisfaction</h3>
              <p>We're committed to making you happy with every order.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
