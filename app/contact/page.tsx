"use client";

import Link from "next/link";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaArrowRight } from "react-icons/fa";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function ContactPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-background pt-10 pb-20">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        
        {/* ================= PAGE HEADER ================= */}
        <div data-aos="fade-down" className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Get In <span className="text-primary">Touch</span>
          </h1>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Have a question, feedback, or need help with your order? 
            We are here to assist you 24/7.
          </p>
        </div>

        {/* ================= CONTACT CARDS (TOP ROW) ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div data-aos="fade-up" data-aos-delay="100" className="bg-card border border-border rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition">
            <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center text-primary text-2xl mx-auto mb-4">
              <FaPhone />
            </div>
            <h3 className="font-bold text-lg text-foreground mb-1">Call Us</h3>
            <p className="text-foreground/70">+237 654 905 427/ 671 29 2841</p>
          </div>

          <div data-aos="fade-up" data-aos-delay="200" className="bg-card border border-border rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition">
            <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center text-primary text-2xl mx-auto mb-4">
              <FaEnvelope />
            </div>
            <h3 className="font-bold text-lg text-foreground mb-1">Email Us</h3>
            <p className="text-foreground/70">Restorgmt237@gmail.com</p>
          </div>

          <div data-aos="fade-up" data-aos-delay="300" className="bg-card border border-border rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition">
            <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center text-primary text-2xl mx-auto mb-4">
              <FaMapMarkerAlt />
            </div>
            <h3 className="font-bold text-lg text-foreground mb-1">Visit Us</h3>
            <p className="text-foreground/70">City Chemist, Bamenda, Cameroon</p>
          </div>
        </div>

        {/* ================= CONTACT FORM & MAP SECTION ================= */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* LEFT SIDE: Contact Form */}
          <div data-aos="fade-right" className="bg-card border border-border rounded-2xl shadow-lg p-8 md:p-10">
            <h2 className="text-2xl font-bold mb-6 text-foreground">Send us a Message</h2>
            <p className="text-foreground/60 mb-8 text-sm">
              We usually respond to inquiries within 1-2 hours.
            </p>

            {/* ✅ Contact Form connected to your Formspree */}
            <form 
              action="https://formspree.io/f/xqerjprp" 
              method="POST" 
              className="space-y-5"
            >
              {/* Hidden field so you know it came from the Contact page */}
              <input type="hidden" name="_subject" value="New Contact Form Message - Restor" />

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">Full Name</label>
                  <input 
                    type="text" 
                    name="name" 
                    placeholder="Telrah Ngwa" 
                    className="w-full p-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary text-foreground placeholder:text-foreground/50"
                    required 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">Email Address</label>
                  <input 
                    type="email" 
                    name="_replyto" 
                    placeholder="hello@example.com" 
                    className="w-full p-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary text-foreground placeholder:text-foreground/50"
                    required 
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">Subject</label>
                <input 
                  type="text" 
                  name="subject" 
                  placeholder="Order Issue, Partnership, etc..." 
                  className="w-full p-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary text-foreground placeholder:text-foreground/50"
                  required 
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">Message</label>
                <textarea 
                  name="message" 
                  rows={5} 
                  placeholder="Write your message here..." 
                  className="w-full p-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary text-foreground placeholder:text-foreground/50 resize-none"
                  required
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold hover:bg-primary-hover transition flex items-center justify-center gap-3 shadow-lg shadow-primary/30"
              >
                Send Message <FaArrowRight />
              </button>
            </form>
          </div>

          {/* RIGHT SIDE: Info / Map Placeholder */}
          <div data-aos="fade-left" className="bg-card border border-border rounded-2xl shadow-lg overflow-hidden h-full min-h-[400px] relative flex flex-col items-center justify-center p-8 text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"></div>
            
            <div className="relative z-10">
              <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center text-5xl mb-6 mx-auto">
                🇨🇲
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">Restor Headquarters</h3>
              <p className="text-foreground/70 max-w-sm mx-auto mb-6">
                Located in the heart of Bamenda, we serve delicious food across all of Cameroon.
              </p>
              <div className="flex flex-col gap-2 text-sm text-foreground/60">
                <p>📍 City Chemist, Bamenda, Cameroon</p>
                <p>📧 Restorgmt237@gmail.com</p>
                <p>📞 +237 654 905 427/ 671 29 2841</p>
              </div>
              
              {/* ✅ UPDATED MAP: Bamenda City Chemist */}
              <div className="mt-6 rounded-xl border border-border overflow-hidden">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.2134577575367!2d10.1469284!3d5.951469!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104ddeb220c1c801%3A0x9b42c0e874a1c2d!2sCity%20Chemist%20Bamenda!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus" 
                  width="100%" 
                  height="200" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-xl"
                ></iframe>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}