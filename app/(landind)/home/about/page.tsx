"use client";

import Link from "next/link";
import Image from "next/image";
import {
  FaTruck,
  FaStore,
  FaLocationDot,
  FaUtensils,
  FaPlay,
  FaShareNodes,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const FEATURES = [
  {
    icon: FaTruck,
    title: "Fast Delivery",
    description: "Hot meals reach your door in 30 minutes or less, every time.",
  },
  {
    icon: FaStore,
    title: "Verified Vendors",
    description: "Every restaurant on Restor is vetted for quality and hygiene.",
  },
  {
    icon: FaLocationDot,
    title: "Live Tracking",
    description: "Watch your rider move from kitchen to doorstep in real time.",
  },
  {
    icon: FaUtensils,
    title: "Wide Selection",
    description: "From street food to fine dining, all in one app.",
  },
];

const TEAM = [
  {
    name: "Brandon Mane",
    role: "Frontend & UI",
    image: "/images/brandon.jpeg",
  },
  {
    name: "D-ReX",
    role: "Backend & Admin",
    image: "/images/drex.jpg",
  },
  {
    name: "Neba Telrah",
    role: "Vendor & Driver Backend",
    image: "/images/neba.jpg",
  },
  {
    name: "Nde Ndoh",
    role: "QA & Support",
    image: "/images/ndo.jpg",
  },
];

// Repeating dot texture used as a quiet signature motif across the dark
// hero and the team panel, echoing Restor's "pin drop" delivery marker.
const dotPattern = {
  backgroundImage:
    "radial-gradient(currentColor 1px, transparent 1px)",
  backgroundSize: "18px 18px",
};

export default function AboutPage() {
  const [mounted, setMounted] = useState(false);
  const teamTrackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMounted(true);
    AOS.init({ duration: 800, once: true });
  }, []);

  if (!mounted) return null;

  const scrollTeam = (direction: "left" | "right") => {
    const track = teamTrackRef.current;
    if (!track) return;
    const amount = track.clientWidth * 0.8;
    track.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* ================= HERO / BREADCRUMB ================= */}
      <div className="relative overflow-hidden bg-gray-950 py-20 text-white">
        <div
          className="absolute inset-0 text-white/[0.06]"
          style={dotPattern}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/40 to-gray-950/70" />

        <div className="relative mx-auto max-w-6xl px-6 text-center lg:px-10">
          <h1 className="font-serif text-4xl italic tracking-tight md:text-6xl">
            About Us
          </h1>
          <div className="mt-5 flex items-center justify-center gap-2 text-sm text-white/60">
            <span>/</span>
            <span className="text-primary">About Us</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 pb-20 lg:px-10">
        {/* ================= INVITE + BANNER ================= */}
        <div data-aos="fade-up" className="pt-16 text-center">
          <h2 className="font-serif text-2xl italic text-foreground md:text-4xl">
            We Invite You to Taste Cameroon
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-foreground/60">
            Restor was born to bridge the gap between local restaurants and
            hungry customers. From Bamenda to Douala, we partner with the
            best local vendors to bring authentic Cameroonian flavors
            straight to your doorstep — quickly, and with a lot of heart.
          </p>
        </div>

        <div
          data-aos="fade-up"
          className="relative mt-10 h-56 overflow-hidden rounded-2xl border border-border/30 shadow-lg md:h-[420px]"
        >
          <Image
            src="/images/hero-food.png"
            alt="Inside a Restor partner kitchen"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
          <button
            type="button"
            aria-label="Play Restor story video"
            className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl transition hover:scale-105 hover:bg-primary-hover"
          >
            <FaPlay className="ml-1 h-5 w-5" />
          </button>
        </div>

        {/* ================= WHAT WE DO ================= */}
        <div data-aos="fade-up" className="mt-20 text-center">
          <h2 className="font-serif text-2xl italic text-foreground md:text-4xl">
            What We Do
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="rounded-2xl border border-border/30 bg-card/50 p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-xl text-primary-foreground">
                  <Icon />
                </div>
                <h3 className="text-base font-semibold text-foreground">
                  {title}
                </h3>
                <p className="mt-2 text-xs leading-6 text-foreground/60">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ================= TEAM PANEL ================= */}
        <div data-aos="fade-up" className="relative mt-20">
          <div
            className="absolute inset-0 rounded-3xl bg-primary/5 text-primary/[0.07]"
            style={dotPattern}
            aria-hidden="true"
          />

          <div className="relative rounded-3xl px-6 py-14 md:px-12">
            <h2 className="text-center font-serif text-2xl italic text-foreground md:text-4xl">
              The Team Behind Restor
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-center text-sm text-foreground/60">
              Four developers building the future of food delivery in
              Cameroon.
            </p>

            <div className="relative mt-10">
              <button
                type="button"
                onClick={() => scrollTeam("left")}
                aria-label="Scroll team left"
                className="absolute left-0 top-1/2 z-10 flex h-10 w-10 -translate-x-4 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md transition hover:bg-primary-hover md:-translate-x-5"
              >
                <FaChevronLeft className="h-3.5 w-3.5" />
              </button>

              <div
                ref={teamTrackRef}
                className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                {TEAM.map((member) => (
                  <div
                    key={member.name}
                    className="w-[calc(50%-10px)] flex-shrink-0 snap-start overflow-hidden rounded-2xl border border-border/30 bg-card shadow-sm sm:w-[calc(33.333%-14px)] lg:w-[calc(25%-15px)]"
                  >
                    <div className="relative h-48 w-full">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="relative p-4">
                      <h4 className="text-sm font-bold text-foreground">
                        {member.name}
                      </h4>
                      <p className="text-xs text-primary">{member.role}</p>
                      <button
                        type="button"
                        aria-label={`View ${member.name}'s profile`}
                        className="absolute bottom-4 right-4 flex h-8 w-8 items-center justify-center rounded-full border border-border/50 text-foreground/60 transition hover:border-primary hover:text-primary"
                      >
                        <FaShareNodes className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => scrollTeam("right")}
                aria-label="Scroll team right"
                className="absolute right-0 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 translate-x-4 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md transition hover:bg-primary-hover md:translate-x-5"
              >
                <FaChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* ================= NEWSLETTER ================= */}
        <div
          data-aos="fade-up"
          className="mt-20 grid grid-cols-1 items-center gap-8 rounded-2xl border border-border/30 bg-card/50 p-8 md:grid-cols-[auto,1fr] md:p-12"
        >
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 text-5xl md:h-32 md:w-32">
            📬
          </div>

          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-foreground">
              Stay in the Loop
            </h2>
            <p className="mt-2 text-sm text-foreground/60">
              Get notified when new restaurants join Restor and be first to
              hear about seasonal offers.
            </p>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-5 flex flex-col gap-3 sm:flex-row"
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                placeholder="Enter your email"
                className="flex-1 rounded-full border border-border bg-background px-5 py-3 text-sm text-foreground outline-none transition focus:border-primary"
              />
              <button
                type="submit"
                className="rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary-hover"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}