"use client";

import Link from "next/link";
import { FaMotorcycle, FaClock, FaMoneyBillWave, FaArrowRight, FaUpload, FaLink } from "react-icons/fa";

export default function BecomeDriverPage() {
  return (
    <div className="min-h-screen bg-background pt-10 pb-20">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
            🇨🇲 Earn Flexible Income
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Become a <span className="text-primary">Restor Driver</span>
          </h1>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Turn your free time into cash. Deliver food in your city 
            and get paid daily with Restor.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="p-6 rounded-2xl border border-border bg-card shadow-sm text-center">
            <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center text-primary text-2xl mx-auto mb-4">
              <FaClock />
            </div>
            <h3 className="text-xl font-bold mb-2">Flexible Hours</h3>
            <p className="text-foreground/60">Work whenever you want. No strict schedule, you are in control.</p>
          </div>
          <div className="p-6 rounded-2xl border border-border bg-card shadow-sm text-center">
            <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center text-primary text-2xl mx-auto mb-4">
              <FaMoneyBillWave />
            </div>
            <h3 className="text-xl font-bold mb-2">Daily Payouts</h3>
            <p className="text-foreground/60">Get paid directly to your mobile money account every day you deliver.</p>
          </div>
          <div className="p-6 rounded-2xl border border-border bg-card shadow-sm text-center">
            <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center text-primary text-2xl mx-auto mb-4">
              <FaMotorcycle />
            </div>
            <h3 className="text-xl font-bold mb-2">Bike or Car</h3>
            <p className="text-foreground/60">We accept both motorcycles and cars. Partner with any vehicle type.</p>
          </div>
        </div>

        {/* FORM WITH VISUAL FILE UPLOAD + DRIVE LINK FALLBACK */}
        <div className="max-w-2xl mx-auto bg-card border border-border rounded-2xl shadow-lg p-8 md:p-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Sign Up to Drive</h2>
          
          <form 
            action="https://formspree.io/f/xqerjprp"
            method="POST"
            className="space-y-5"
          >
            <input type="hidden" name="_subject" value="New Driver Application - Restor" />

            <div>
              <label className="block text-sm font-medium mb-2">Full Name</label>
              <input type="text" name="name" placeholder="John Doe" className="w-full p-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary" required />
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium mb-2">Email Address</label>
                <input type="email" name="_replyto" placeholder="driver@gmail.com" className="w-full p-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Phone Number</label>
                <input type="tel" name="phone" placeholder="+237 6XX XXX XXX" className="w-full p-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary" required />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Vehicle Type</label>
              <select name="vehicle_type" className="w-full p-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary" required>
                <option value="">Select your vehicle...</option>
                <option value="bike">Motorcycle / Bike</option>
                <option value="car">Car</option>
              </select>
            </div>

            {/* 📁 VISUAL FILE UPLOAD SECTION (For UI) */}
            <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:bg-muted/50 transition cursor-pointer">
              <label className="cursor-pointer block">
                <div className="flex flex-col items-center gap-2">
                  <FaUpload className="text-2xl text-primary" />
                  <span className="font-medium text-sm">Upload Driver's License / ID</span>
                  <span className="text-xs text-foreground/50">(PDF, JPG, PNG)</span>
                </div>
                <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" />
              </label>
            </div>

            {/* 🔗 GOOGLE DRIVE FALLBACK LINK (Ensures you receive the document!) */}
            <div className="border-2 border-border rounded-xl p-5 bg-muted/10">
              <label className="block">
                <div className="flex items-center gap-2 mb-2">
                  <FaLink className="text-primary" />
                  <span className="font-medium text-sm">Or paste a Google Drive / Dropbox link</span>
                </div>
                <p className="text-xs text-foreground/50 mb-2">
                  If the upload doesn't work, please upload to Google Drive and paste the link below.
                </p>
                <input 
                  type="url" 
                  name="document_link" 
                  placeholder="https://drive.google.com/file/d/..." 
                  className="w-full p-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </label>
            </div>

            <button type="submit" className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold hover:bg-primary-hover transition flex items-center justify-center gap-3 shadow-lg shadow-primary/30 mt-4">
              Start Delivering <FaArrowRight />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}