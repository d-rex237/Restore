"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { 
  FaMotorcycle, 
  FaClock, 
  FaCheckCircle, 
  FaMapMarkerAlt, 
  FaUser,
  FaToggleOn,
  FaToggleOff,
  FaArrowRight,
  FaCar // ✅ Added Car Icon
} from "react-icons/fa";

// Mock data to simulate what the backend will return
// 🔄 Replace this with fetch() calls to your backend teammate's API later
const mockAvailableDeliveries = [
  { id: 101, restaurant: "Mama's Kitchen", customer: "John Doe", address: "Bamenda City Chemist", distance: "2.3 km", price: 1500, time: "15 min" },
  { id: 102, restaurant: "Poulet DG House", customer: "Jane Smith", address: "Bamenda Main Market", distance: "4.1 km", price: 1200, time: "20 min" },
  { id: 103, restaurant: "Eru Spot", customer: "Muluh Owen", address: "Longla, Rend-Vouvs-Junction", distance: "1.5 km", price: 1800, time: "10 min" },
];

export default function DriverPage() {
  const [isAvailable, setIsAvailable] = useState(false);
  const [activeTab, setActiveTab] = useState<'available' | 'active' | 'history'>('available');
  const [deliveries, setDeliveries] = useState(mockAvailableDeliveries);
  
  // ✅ NEW: State for vehicle type
  const [vehicleType, setVehicleType] = useState<'Bike' | 'Car'>('Bike');

  // 🔄 This is where you will connect to your backend:
  // useEffect(() => {
  //   fetch('/api/driver/deliveries/available')
  //     .then(res => res.json())
  //     .then(data => setDeliveries(data))
  // }, []);

  const toggleAvailability = () => {
    setIsAvailable(!isAvailable);
    // 🔄 Connect to backend: fetch('/api/driver/toggle-availability', { method: 'POST' })
  };

  const acceptDelivery = (id: number) => {
    alert(`✅ Delivery #${id} accepted! Redirecting to active delivery...`);
    // 🔄 Connect to backend: fetch(`/api/driver/deliveries/${id}/accept`, { method: 'POST' })
  };

  return (
    <div className="min-h-screen bg-background flex">
      
      {/* ================= SIDEBAR ================= */}
      <aside className="w-64 border-r border-border bg-card/50 hidden md:flex flex-col p-6">
        <h2 className="text-xl font-bold text-foreground mb-8 flex items-center gap-2">
          <FaMotorcycle className="text-primary" /> Driver Portal
        </h2>
        
        <nav className="space-y-2 flex-1">
          <button onClick={() => setActiveTab('available')} className={`w-full text-left px-4 py-3 rounded-xl transition ${activeTab === 'available' ? 'bg-primary/10 text-primary' : 'text-foreground/70 hover:bg-muted'}`}>
            Available Deliveries
          </button>
          <button onClick={() => setActiveTab('active')} className={`w-full text-left px-4 py-3 rounded-xl transition ${activeTab === 'active' ? 'bg-primary/10 text-primary' : 'text-foreground/70 hover:bg-muted'}`}>
            Active Delivery
          </button>
          <button onClick={() => setActiveTab('history')} className={`w-full text-left px-4 py-3 rounded-xl transition ${activeTab === 'history' ? 'bg-primary/10 text-primary' : 'text-foreground/70 hover:bg-muted'}`}>
            Delivery History
          </button>
        </nav>

        <div className="border-t border-border pt-6 mt-auto">
          <Link href="/profile" className="flex items-center gap-3 text-foreground/70 hover:text-foreground transition">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
              <FaUser className="w-4 h-4" />
            </div>
            <span className="text-sm font-medium">Driver Profile</span>
          </Link>
        </div>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main className="flex-1 p-6 md:p-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">Driver Dashboard</h1>
            <p className="text-sm text-foreground/60 mt-1">Manage your deliveries and earnings</p>
          </div>
          
          {/* ✅ NEW: Vehicle Selector + Online Toggle */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Vehicle Type Dropdown */}
            <select
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value as 'Bike' | 'Car')}
              className="bg-card/50 border border-border/30 rounded-full px-4 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="Bike">🏍️ Bike</option>
              <option value="Car">🚗 Car</option>
            </select>

            {/* Online/Offline Toggle */}
            <button 
              onClick={toggleAvailability}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition ${isAvailable ? 'bg-green-500/20 text-green-600' : 'bg-red-500/20 text-red-600'}`}
            >
              {isAvailable ? <FaToggleOn className="text-green-500 text-xl" /> : <FaToggleOff className="text-red-500 text-xl" />}
              {isAvailable ? 'Online' : 'Offline'}
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="p-4 rounded-2xl border border-border/30 bg-card/50 shadow-sm">
            <p className="text-xs text-foreground/50 uppercase tracking-wider">Today's Deliveries</p>
            <p className="text-2xl font-bold text-foreground mt-1">12</p>
          </div>
          <div className="p-4 rounded-2xl border border-border/30 bg-card/50 shadow-sm">
            <p className="text-xs text-foreground/50 uppercase tracking-wider">Today's Earnings</p>
            <p className="text-2xl font-bold text-primary mt-1">18,500 FCFA</p>
          </div>
          <div className="p-4 rounded-2xl border border-border/30 bg-card/50 shadow-sm">
            <p className="text-xs text-foreground/50 uppercase tracking-wider">Rating</p>
            <p className="text-2xl font-bold text-foreground mt-1">4.9 ★</p>
          </div>
        </div>

        {/* Mobile Navigation Tabs */}
        <div className="flex md:hidden gap-2 mb-6 border-b border-border pb-2">
          <button onClick={() => setActiveTab('available')} className={`px-4 py-2 text-sm font-medium rounded-full ${activeTab === 'available' ? 'bg-primary/10 text-primary' : 'text-foreground/60'}`}>Available</button>
          <button onClick={() => setActiveTab('active')} className={`px-4 py-2 text-sm font-medium rounded-full ${activeTab === 'active' ? 'bg-primary/10 text-primary' : 'text-foreground/60'}`}>Active</button>
          <button onClick={() => setActiveTab('history')} className={`px-4 py-2 text-sm font-medium rounded-full ${activeTab === 'history' ? 'bg-primary/10 text-primary' : 'text-foreground/60'}`}>History</button>
        </div>

        {/* ================= AVAILABLE DELIVERIES LIST ================= */}
        {activeTab === 'available' && (
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-4">Available Deliveries Near You</h2>
            {deliveries.length === 0 ? (
              <div className="text-center py-12 border border-dashed border-border rounded-2xl">
                <p className="text-foreground/60">No deliveries available right now. Check back soon!</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {deliveries.map((delivery) => (
                  <div key={delivery.id} className="p-4 md:p-6 rounded-2xl border border-border/30 bg-card/50 shadow-sm hover:shadow-md transition-all">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-foreground">{delivery.restaurant}</span>
                          <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">{delivery.distance}</span>
                        </div>
                        <p className="text-sm text-foreground/60">To: {delivery.address}</p>
                        <p className="text-xs text-foreground/50 mt-1">Customer: {delivery.customer}</p>
                      </div>
                      <div className="flex flex-col items-end gap-2 w-full md:w-auto">
                        <span className="font-bold text-primary text-lg">{delivery.price.toLocaleString()} FCFA</span>
                        <span className="text-xs text-foreground/50 flex items-center gap-1"><FaClock /> {delivery.time}</span>
                        <button 
                          onClick={() => acceptDelivery(delivery.id)}
                          className="w-full md:w-auto bg-primary text-white px-4 py-2 rounded-full text-sm font-medium hover:opacity-90 transition flex items-center gap-2"
                        >
                          Accept Delivery <FaArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ================= ACTIVE DELIVERY ================= */}
        {activeTab === 'active' && (
          <div className="p-6 rounded-2xl border border-border/30 bg-card/50 shadow-sm">
            <div className="flex items-center gap-2 mb-4 text-green-500">
              <FaCheckCircle className="text-xl" />
              <h2 className="text-lg font-semibold text-foreground">You are on a delivery!</h2>
            </div>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1 space-y-2">
                <p className="text-sm text-foreground/60">Restaurant: <span className="text-foreground font-medium">Mama's Kitchen</span></p>
                <p className="text-sm text-foreground/60">Customer: <span className="text-foreground font-medium">Paul Biya</span></p>
                <p className="text-sm text-foreground/60">Address: <span className="text-foreground font-medium">Bamenda City Chemist</span></p>
              </div>
              <div className="flex gap-3 flex-wrap">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:opacity-90 transition">Picked Up</button>
                <button className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:opacity-90 transition">Out for Delivery</button>
                <button className="bg-gray-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:opacity-90 transition">Mark as Delivered</button>
              </div>
            </div>
          </div>
        )}

        {/* ================= DELIVERY HISTORY ================= */}
        {activeTab === 'history' && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground mb-4">Completed Deliveries</h2>
            <div className="flex items-center justify-between p-4 border border-border/30 rounded-2xl bg-card/50 shadow-sm">
              <div>
                <p className="font-medium text-foreground">Mama's Kitchen → City Chemist</p>
                <p className="text-xs text-foreground/60">2 hours ago</p>
              </div>
              <span className="font-bold text-primary">1,500 FCFA</span>
            </div>
            <div className="flex items-center justify-between p-4 border border-border/30 rounded-2xl bg-card/50 shadow-sm">
              <div>
                <p className="font-medium text-foreground">Poulet DG House → Main Market</p>
                <p className="text-xs text-foreground/60">4 hours ago</p>
              </div>
              <span className="font-bold text-primary">1,200 FCFA</span>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}