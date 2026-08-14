"use client";

import Image from "next/image";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaArrowRight,
  FaClock,
} from "react-icons/fa";
import { useEffect, useState } from "react";

export default function ContactPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const contactIndex = [
    {
      icon: FaPhone,
      label: "Call us",
      value: "+237 654 905 427",
      sub: "+237 671 292 841",
    },
    {
      icon: FaEnvelope,
      label: "Email",
      value: "Restorgmt237@gmail.com",
    },
    {
      icon: FaClock,
      label: "Hours",
      value: "Mon — Sun",
      sub: "8AM – 10PM",
    },
    {
      icon: FaMapMarkerAlt,
      label: "HQ",
      value: "City Chemist",
      sub: "Bamenda, Cameroon",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div
        className={`transition-opacity duration-700 ${
          mounted ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* ================= HERO — matches Services page pattern ================= */}
        <div className="bg-gradient-to-br from-primary to-orange-500 px-6 lg:px-10 py-16 md:py-24">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-white text-5xl md:text-6xl font-bold tracking-tight mb-5">
                Get In Touch
              </h1>
              <p className="text-white/90 text-lg mb-2">
                Delicious food. Real support.
              </p>
              <p className="text-white/80 text-base max-w-md">
                Order issues, partnership ideas, anything at all — our
                team answers fast, every day of the week.
              </p>
            </div>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] w-full">
              {/* Replace this src with your own contact/food image asset */}
              <Image
                src="/images/achu.jpg"
                alt="Freshly prepared meal ready for delivery"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          {/* ================= CONTACT STRIP ================= */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-20 -mt-8 mb-16">
            {contactIndex.map((item, i) => (
              <div
                key={i}
                className="bg-background border border-border/40 rounded-2xl p-4 md:p-5 shadow-sm"
              >
                <item.icon className="w-4 h-4 text-primary mb-3" />
                <p className="text-[10px] uppercase tracking-wide text-foreground/50 mb-1">
                  {item.label}
                </p>
                <p className="text-sm font-semibold text-foreground leading-tight">
                  {item.value}
                </p>
                {item.sub && (
                  <p className="text-xs text-foreground/60 leading-tight">
                    {item.sub}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* ================= FORM ================= */}
          <div className="max-w-2xl mb-20">
            <h2 className="text-2xl font-bold tracking-tight mb-1">
              Send a message
            </h2>
            <p className="text-sm text-foreground/60 mb-8">
              We usually reply within 1–2 hours.
            </p>

            <form
              action="https://formspree.io/f/xqerjprp"
              method="POST"
              className="space-y-4"
            >
              <input
                type="hidden"
                name="_subject"
                value="New Contact Form Message - Restor"
              />

              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Full name"
                  className="w-full px-5 py-4 rounded-2xl bg-foreground/[0.04] border border-transparent focus:border-primary focus:bg-background outline-none transition-all text-sm placeholder:text-foreground/40"
                  required
                />
                <input
                  type="email"
                  name="_replyto"
                  placeholder="Email address"
                  className="w-full px-5 py-4 rounded-2xl bg-foreground/[0.04] border border-transparent focus:border-primary focus:bg-background outline-none transition-all text-sm placeholder:text-foreground/40"
                  required
                />
              </div>

              <input
                type="text"
                name="subject"
                placeholder="Subject"
                className="w-full px-5 py-4 rounded-2xl bg-foreground/[0.04] border border-transparent focus:border-primary focus:bg-background outline-none transition-all text-sm placeholder:text-foreground/40"
                required
              />

              <textarea
                name="message"
                rows={4}
                placeholder="Your message"
                className="w-full px-5 py-4 rounded-2xl bg-foreground/[0.04] border border-transparent focus:border-primary focus:bg-background outline-none transition-all text-sm resize-none placeholder:text-foreground/40"
                required
              ></textarea>
          <button type="submit"className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-full font-semibold text-sm hover:bg-orange-600 transition-colors">
                Send message <FaArrowRight className="w-3.5 h-3.5" /></button>
            </form>
          </div>

          {/* ================= MAP PANEL ================= */}
          <div className="mb-20">
            <div className="rounded-3xl overflow-hidden border border-border/40 relative">
              <div className="absolute top-4 left-4 z-10 bg-background/95 backdrop-blur px-4 py-2 rounded-full shadow-md flex items-center gap-2">
                <FaMapMarkerAlt className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs font-semibold">
                  City Chemist, Bamenda
                </span>
              </div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.2134577575367!2d10.1469284!3d5.951469!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104ddeb220c1c801%3A0x9b42c0e874a1c2d!2sCity%20Chemist%20Bamenda!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                width="100%"
                height="420"
                style={{ border: 0, display: "block" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="dark:invert dark:hue-rotate-180"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}