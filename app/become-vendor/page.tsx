"use client";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import Link from "next/link";
import {
  FaStore,
  FaUsers,
  FaChartLine,
  FaArrowRight,
  FaUpload,
} from "react-icons/fa";

export default function BecomeVendorPage() {
  return (
    <div className="min-h-screen bg-background pt-10 pb-20">
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
            🇨🇲 Grow Your Business
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Partner with <span className="text-primary">Restor</span>
          </h1>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Join Cameroon's fastest-growing food delivery platform. Reach
            thousands of hungry customers in your city today.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="p-6 rounded-2xl border border-border bg-card shadow-sm text-center">
            <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center text-primary text-2xl mx-auto mb-4">
              <FaUsers />
            </div>
            <h3 className="text-xl font-bold mb-2">More Customers</h3>
            <p className="text-foreground/60">
              Get your restaurant in front of 20,000+ active food lovers in your
              area.
            </p>
          </div>
          <div className="p-6 rounded-2xl border border-border bg-card shadow-sm text-center">
            <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center text-primary text-2xl mx-auto mb-4">
              <FaStore />
            </div>
            <h3 className="text-xl font-bold mb-2">Easy Management</h3>
            <p className="text-foreground/60">
              Receive orders instantly through our easy-to-use vendor dashboard.
            </p>
          </div>
          <div className="p-6 rounded-2xl border border-border bg-card shadow-sm text-center">
            <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center text-primary text-2xl mx-auto mb-4">
              <FaChartLine />
            </div>
            <h3 className="text-xl font-bold mb-2">Track Sales</h3>
            <p className="text-foreground/60">
              Monitor your revenue daily with real-time analytics and reports.
            </p>
          </div>
        </div>

        {/* ✅ UPDATED FORM WITH FILE UPLOADS (Web3Forms) */}
        <div className="max-w-2xl mx-auto bg-card border border-border rounded-2xl shadow-lg p-8 md:p-12">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Apply to Partner
          </h2>

          <form
            action="https://api.web3forms.com/submit"
            method="POST"
            className="space-y-5"
          >
            {/* ✅ REPLACE THIS WITH YOUR WEB3FORMS ACCESS KEY */}
            <input
              type="hidden"
              name="access_key"
              value="YOUR_WEB3FORMS_ACCESS_KEY"
            />

            <div>
              <label className="block text-sm font-medium mb-2">
                Restaurant Name
              </label>
              <input
                type="text"
                name="restaurant_name"
                placeholder="e.g. Mama's Kitchen"
                className="w-full p-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Owner's Full Name
              </label>
              <input
                type="text"
                name="owner_name"
                placeholder="John Doe"
                className="w-full p-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="hello@restaurant.com"
                  className="w-full p-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="+237 6XX XXX XXX"
                  className="w-full p-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Restaurant Address
              </label>
              <input
                type="text"
                name="address"
                placeholder="Bastos, Yaoundé"
                className="w-full p-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            {/* ✅ NEW: File Upload Section */}
            <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:bg-muted/50 transition cursor-pointer">
              <label className="cursor-pointer block">
                <div className="flex flex-col items-center gap-2">
                  <FaUpload className="text-2xl text-primary" />
                  <span className="font-medium text-sm">
                    Upload Business Registration / ID
                  </span>
                  <span className="text-xs text-foreground/50">
                    (PDF, JPG, PNG - Max 5MB)
                  </span>
                </div>
                <input
                  type="file"
                  name="document"
                  className="hidden"
                  accept=".pdf,.jpg,.jpeg,.png"
                  required
                />
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold hover:bg-primary-hover transition flex items-center justify-center gap-3 shadow-lg shadow-primary/30 mt-4"
            >
              Submit Application <FaArrowRight />
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
