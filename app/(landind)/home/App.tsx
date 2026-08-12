import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ServicesPage from "./services/page";
import MenuPage from "./menu/page";
import OrderPage from "./cart/page";
import ContactPage from "./contact/page";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ServicesPage />} />
        <Route path="/home/menu" element={<MenuPage />} />
        <Route path="/home/order" element={<OrderPage />} />
        <Route path="/home/contact" element={<ContactPage />} />
      </Routes>
    </Router>
  );
};

export default App;
