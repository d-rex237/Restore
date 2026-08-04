"use client";

import Link from "next/link";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaArrowRight,
  FaClock,
} from "react-icons/fa";
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
        
        {/* ================= HEADER WITH SUBTLE GRADIENT ================= */}
        <div 
          data-aos="fade-down" 
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/5 to-orange-500/5 border border-border/30 p-8 md:p-12 text-center mb-16"
        >
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold mb-4">
              📞 24/7 Support
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-3 tracking-tight">
              Get In <span className="text-primary">Touch</span>
            </h1>
            <p className="text-base text-foreground/70 max-w-2xl mx-auto">
              Have a question, feedback, or need help with your order? Our support team is here to assist you 24/7.
            </p>
          </div>
          <div className="absolute -top-10 -right-10 text-9xl text-foreground/5 select-none">
            ✉️
          </div>
        </div>

        {/* ================= CONTACT CARDS ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16">
          <div
            data-aos="fade-up"
            data-aos-delay="100"
            className="flex items-center gap-4 p-4 rounded-2xl border border-border/30 bg-card/50 shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary/20 to-orange-500/20 flex items-center justify-center text-primary text-lg flex-shrink-0">
              <FaPhone />
            </div>
            <div>
              <p className="text-[10px] text-foreground/50 uppercase tracking-wider">Call us</p>
              <p className="text-sm font-medium text-foreground">+237 654 905 427</p>
            </div>
          </div>

          <div
            data-aos="fade-up"
            data-aos-delay="200"
            className="flex items-center gap-4 p-4 rounded-2xl border border-border/30 bg-card/50 shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary/20 to-orange-500/20 flex items-center justify-center text-primary text-lg flex-shrink-0">
              <FaEnvelope />
            </div>
            <div>
              <p className="text-[10px] text-foreground/50 uppercase tracking-wider">Email us</p>
              <p className="text-sm font-medium text-foreground">Restorgmt237@gmail.com</p>
            </div>
          </div>

          <div
            data-aos="fade-up"
            data-aos-delay="300"
            className="flex items-center gap-4 p-4 rounded-2xl border border-border/30 bg-card/50 shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary/20 to-orange-500/20 flex items-center justify-center text-primary text-lg flex-shrink-0">
              <FaClock />
            </div>
            <div>
              <p className="text-[10px] text-foreground/50 uppercase tracking-wider">Working Hours</p>
              <p className="text-sm font-medium text-foreground">Mon - Sun: 8AM - 10PM</p>
            </div>
          </div>
        </div>

        {/* ================= MAIN GRID: FORM + MAP ================= */}
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          
          {/* LEFT SIDE: Contact Form */}
          <div
            data-aos="fade-right"
            className="p-6 md:p-8 rounded-2xl border border-border/30 bg-card/50 shadow-sm"
          >
            <h2 className="text-xl font-bold text-foreground mb-1">Send us a Message</h2>
            <p className="text-sm text-foreground/60 mb-6">
              We usually respond to inquiries within 1-2 hours.
            </p>

            {/* Contact Form */}
            <form 
              action="https://formspree.io/f/xqerjprp" 
              method="POST" 
              className="space-y-4"
            >
              <input type="hidden" name="_subject" value="New Contact Form Message - Restor" />

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-foreground/70 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Telrah Ngwa"
                    className="w-full px-4 py-2.5 rounded-xl border border-border/30 bg-background/50 focus:bg-background focus:ring-2 focus:ring-primary outline-none transition-all text-sm text-foreground placeholder:text-foreground/40"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-foreground/70 mb-1">
                    Email Address
                  </label>
                  <input 
                    type="email" 
                    name="_replyto" 
                    placeholder="hello@example.com" 
                    className="w-full px-4 py-2.5 rounded-xl border border-border/30 bg-background/50 focus:bg-background focus:ring-2 focus:ring-primary outline-none transition-all text-sm text-foreground placeholder:text-foreground/40"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-foreground/70 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  placeholder="Order Issue, Partnership, etc..."
                  className="w-full px-4 py-2.5 rounded-xl border border-border/30 bg-background/50 focus:bg-background focus:ring-2 focus:ring-primary outline-none transition-all text-sm text-foreground placeholder:text-foreground/40"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-foreground/70 mb-1">
                  Message
                </label>
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Write your message here..."
                  className="w-full px-4 py-2.5 rounded-xl border border-border/30 bg-background/50 focus:bg-background focus:ring-2 focus:ring-primary outline-none transition-all text-sm text-foreground placeholder:text-foreground/40 resize-none"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-orange-500 text-white py-3 rounded-xl font-medium hover:opacity-90 transition flex items-center justify-center gap-2 shadow-lg shadow-primary/30"
              >
                Send Message <FaArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* RIGHT SIDE: Map & Info */}
          <div
            data-aos="fade-left"
            className="p-6 md:p-8 rounded-2xl border border-border/30 bg-card/50 shadow-sm flex flex-col"
          >
            <h2 className="text-xl font-bold text-foreground mb-1">Visit Our HQ</h2>
            <p className="text-sm text-foreground/60 mb-4">
              City Chemist, Bamenda, Cameroon
            </p>

            <div className="relative w-full h-56 rounded-xl overflow-hidden border border-border/30 mb-4 bg-gradient-to-br from-primary/5 to-orange-500/5">
              {/* Decorative background while map loads */}
              <div className="absolute inset-0 flex items-center justify-center text-6xl text-foreground/10">
                📍
              </div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.2134577575367!2d10.1469284!3d5.951469!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104ddeb220c1c801%3A0x9b42c0e874a1c2d!2sCity%20Chemist%20Bamenda!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="relative z-10 rounded-xl"
              ></iframe>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl border border-border/30 bg-background/30">
                <p className="text-[10px] text-foreground/50 uppercase tracking-wider">Email</p>
                <p className="text-xs font-medium text-foreground truncate">Restorgmt237@gmail.com</p>
              </div>
              <div className="p-3 rounded-xl border border-border/30 bg-background/30">
                <p className="text-[10px] text-foreground/50 uppercase tracking-wider">Phone</p>
                <p className="text-xs font-medium text-foreground">+237 654 905 427/671 29 2841</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}