"use client";

import Image from "next/image";
import {
  FaTruck,
  FaStore,
  FaLocationDot,
  FaUtensils,
  FaShareNodes,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa6";
import { useEffect, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

/* =========================================================
   RESTOR FEATURES
========================================================= */

const FEATURES = [
  {
    icon: FaTruck,
    title: "Fast Delivery",
    description:
      "Hot meals reach your door in 30 minutes or less, every time.",
  },
  {
    icon: FaStore,
    title: "Verified Vendors",
    description:
      "Every restaurant on Restor is carefully selected for quality and hygiene.",
  },
  {
    icon: FaLocationDot,
    title: "Live Tracking",
    description:
      "Watch your rider move from the restaurant to your doorstep in real time.",
  },
  {
    icon: FaUtensils,
    title: "Wide Selection",
    description:
      "From authentic Cameroonian dishes to international favourites, all in one place.",
  },
];

/* =========================================================
   RESTOR TEAM
   These paths point directly to /public/images/
========================================================= */

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

/* =========================================================
   DOT PATTERN
========================================================= */

const dotPattern = {
  backgroundImage:
    "radial-gradient(currentColor 1px, transparent 1px)",
  backgroundSize: "18px 18px",
};

/* =========================================================
   ABOUT PAGE
========================================================= */

export default function AboutPage() {
  const teamTrackRef = useRef<HTMLDivElement | null>(null);

  /* =========================================================
     INITIALIZE AOS
  ========================================================== */

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 80,
      easing: "ease-out-cubic",
    });

    const handleResize = () => {
      AOS.refresh();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      AOS.refreshHard();
    };
  }, []);

  /* =========================================================
     TEAM CAROUSEL
  ========================================================== */

  const scrollTeam = (direction: "left" | "right") => {
    const track = teamTrackRef.current;

    if (!track) return;

    const amount = Math.max(track.clientWidth * 0.8, 280);

    track.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground transition-colors duration-300">

      {/* =======================================================
          HERO SECTION
      ======================================================== */}

      <section className="relative flex min-h-[460px] items-center overflow-hidden">

        {/* -------------------------------------------------------
            HERO IMAGE
            Actual image:
            /public/images/achu.jpg
        -------------------------------------------------------- */}

        <div className="absolute inset-0">
          <Image
            src="/images/about-hero.jpeg"
            alt="Freshly prepared Cameroonian meal"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>

        {/* -------------------------------------------------------
            ORANGE OVERLAY
        -------------------------------------------------------- */}

        <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/75 to-primary-hover/90" />

        {/* -------------------------------------------------------
            DARK MODE OVERLAY
        -------------------------------------------------------- */}

        <div className="absolute inset-0 hidden dark:block dark:bg-black/20" />

        {/* -------------------------------------------------------
            DOT PATTERN
        -------------------------------------------------------- */}

        <div
          className="absolute inset-0 text-primary-foreground/[0.08]"
          style={dotPattern}
          aria-hidden="true"
        />

        {/* -------------------------------------------------------
            DECORATIVE CIRCLES
        -------------------------------------------------------- */}

        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full border border-white/10" />

        <div className="absolute -bottom-32 -left-20 h-96 w-96 rounded-full border border-white/10" />

        {/* -------------------------------------------------------
            HERO CONTENT
        -------------------------------------------------------- */}

        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-24 text-center lg:px-10">

          <div data-aos="fade-up">

            {/* Badge */}

            <span className="mb-5 inline-flex items-center rounded-full border border-white/25 bg-white/10 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.22em] text-primary-foreground backdrop-blur-md">
              Discover Our Story
            </span>

            {/* Heading */}

            <h1 className="font-serif text-5xl italic tracking-tight text-primary-foreground sm:text-6xl md:text-7xl">
              About Us
            </h1>

            {/* Breadcrumb */}

            <div className="mt-6 flex items-center justify-center gap-3 text-sm text-primary-foreground/75">
           
            </div>

            {/* Description */}

            <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-primary-foreground/80 md:text-base">
              Discover the story behind Restor and our mission to connect
              people with amazing food and local restaurants across Cameroon.
            </p>

          </div>
        </div>

        {/* -------------------------------------------------------
            BOTTOM WAVE
        -------------------------------------------------------- */}

        <div className="absolute bottom-0 left-0 right-0 h-14 bg-background [clip-path:ellipse(70%_55%_at_50%_100%)]" />

      </section>

      {/* =======================================================
          MAIN CONTENT
      ======================================================== */}

      <div className="mx-auto max-w-6xl px-6 pb-24 lg:px-10">

        {/* =====================================================
            INTRODUCTION
        ====================================================== */}

        <section
          data-aos="fade-up"
          className="pt-16 text-center md:pt-20"
        >

          <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
            Our Story
          </span>

          <h2 className="mt-3 font-serif text-3xl italic text-foreground sm:text-4xl md:text-5xl">
            We Invite You to Taste Cameroon
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-foreground/60 md:text-base">
            Restor was born to bridge the gap between local restaurants and
            hungry customers. From Bamenda to Douala, we partner with the best
            local vendors to bring authentic Cameroonian flavors straight to
            your doorstep — quickly, conveniently, and with a lot of heart.
          </p>

        </section>

        {/* =====================================================
            FOOD IMAGE BANNER
        ====================================================== */}

        <section
          data-aos="fade-up"
          className="mt-14 md:mt-16"
        >

          <div className="group relative h-[280px] overflow-hidden rounded-3xl shadow-xl sm:h-[320px] md:h-[400px]">

            {/* Actual food image */}

            <Image
              src="/images/Peppersoup.webp"
              alt="Authentic Cameroonian food"
              fill
              sizes="(max-width: 768px) 100vw, 1200px"
              className="object-cover transition duration-700 group-hover:scale-105"
            />

            {/* Image overlay */}

            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

            {/* Image content */}

            <div className="absolute bottom-7 left-7 right-7 text-white sm:bottom-9 sm:left-9 sm:right-9 md:bottom-10 md:left-10 md:right-10">

              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                Taste Cameroon
              </span>

              <h3 className="mt-2 max-w-2xl text-2xl font-bold leading-tight sm:text-3xl md:text-4xl">
                Authentic flavours. Local restaurants. One experience.
              </h3>

            </div>

          </div>

        </section>

        {/* =====================================================
            WHAT WE DO
        ====================================================== */}

        <section
          data-aos="fade-up"
          className="mt-20 text-center md:mt-28"
        >

          <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
            Why Restor
          </span>

          <h2 className="mt-3 font-serif text-3xl italic text-foreground sm:text-4xl md:text-5xl">
            What We Do
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-foreground/60 md:text-base">
            We make discovering restaurants, choosing meals and getting food
            delivered simple, convenient and enjoyable.
          </p>

          {/* ---------------------------------------------------
              FEATURE CARDS
          ---------------------------------------------------- */}

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

            {FEATURES.map(
              ({ icon: Icon, title, description }, index) => (
                <div
                  key={title}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                  className="group rounded-2xl border border-border/30 bg-card/50 p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-primary/30 hover:shadow-xl dark:bg-card/40"
                >

                  {/* Icon */}

                  <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-xl text-primary-foreground shadow-lg shadow-primary/20 transition-transform duration-300 group-hover:scale-110">
                    <Icon />
                  </div>

                  {/* Title */}

                  <h3 className="text-base font-semibold text-foreground md:text-lg">
                    {title}
                  </h3>

                  {/* Description */}

                  <p className="mt-2 text-xs leading-6 text-foreground/60 md:text-sm">
                    {description}
                  </p>

                </div>
              )
            )}

          </div>

        </section>

        {/* =====================================================
            HOW RESTOR WORKS
        ====================================================== */}

        <section
          data-aos="fade-up"
          className="mt-20 md:mt-28"
        >

          <div className="grid items-center gap-10 rounded-3xl border border-border/30 bg-card/40 p-7 md:p-10 lg:grid-cols-2 lg:gap-16 lg:p-12">

            {/* -------------------------------------------------
                LEFT CONTENT
            -------------------------------------------------- */}

            <div>

              <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                Simple & Convenient
              </span>

              <h2 className="mt-3 font-serif text-3xl italic text-foreground sm:text-4xl">
                From discovery to your doorstep.
              </h2>

              <p className="mt-5 text-sm leading-7 text-foreground/60 md:text-base">
                Restor makes it easy to discover restaurants, choose your
                favourite meals and get them delivered wherever you are.
              </p>

              {/* Steps */}

              <div className="mt-8 space-y-6">

                {/* Step 01 */}

                <div className="flex gap-4">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    01
                  </div>

                  <div>
                    <h3 className="font-semibold text-foreground">
                      Discover
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-foreground/60">
                      Find restaurants and explore delicious menus around you.
                    </p>
                  </div>

                </div>

                {/* Step 02 */}

                <div className="flex gap-4">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    02
                  </div>

                  <div>
                    <h3 className="font-semibold text-foreground">
                      Choose
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-foreground/60">
                      Pick the meals that match your taste and budget.
                    </p>
                  </div>

                </div>

                {/* Step 03 */}

                <div className="flex gap-4">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    03
                  </div>

                  <div>
                    <h3 className="font-semibold text-foreground">
                      Enjoy
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-foreground/60">
                      Receive your order and enjoy your meal wherever you are.
                    </p>
                  </div>

                </div>

              </div>

            </div>

            {/* -------------------------------------------------
                RIGHT IMAGE
            -------------------------------------------------- */}

            <div className="relative">

              <div className="absolute -inset-3 rounded-3xl bg-primary/10 blur-2xl" />

              <div className="group relative h-[340px] overflow-hidden rounded-3xl sm:h-[400px]">

                <Image
                  src="/images/achu.jpg"
                  alt="Cameroonian food experience"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />

                <div className="absolute bottom-6 left-6 right-6">

                  <div className="rounded-2xl border border-white/20 bg-white/10 p-5 text-white backdrop-blur-md">

                    <FaUtensils className="text-2xl" />

                    <p className="mt-3 text-lg font-bold">
                      Your next favourite meal is waiting.
                    </p>

                    <p className="mt-1 text-sm text-white/70">
                      Discover something delicious today.
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </section>

        {/* =====================================================
            TEAM SECTION
        ====================================================== */}

        <section
          data-aos="fade-up"
          className="relative mt-20 md:mt-28"
        >

          {/* Dot background */}

          <div
            className="absolute inset-0 rounded-3xl bg-primary/5 text-primary/[0.07] dark:bg-primary/10 dark:text-primary/[0.08]"
            style={dotPattern}
            aria-hidden="true"
          />

          <div className="relative rounded-3xl px-5 py-14 sm:px-8 md:px-12 md:py-16">

            {/* Team heading */}

            <div className="text-center">

              <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                Meet The Team
              </span>

              <h2 className="mt-3 font-serif text-3xl italic text-foreground sm:text-4xl md:text-5xl">
                The Team Behind Restor
              </h2>

              <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-foreground/60">
                Four developers working together to build a modern food
                delivery experience for Cameroon.
              </p>

            </div>

            {/* -------------------------------------------------
                TEAM CAROUSEL
            -------------------------------------------------- */}

            <div className="relative mt-10">

              {/* LEFT ARROW */}

              <button
                type="button"
                onClick={() => scrollTeam("left")}
                aria-label="Scroll team left"
                className="absolute left-0 top-1/2 z-20 flex h-10 w-10 -translate-x-3 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all duration-300 hover:scale-110 hover:bg-primary-hover sm:-translate-x-5"
              >
                <FaChevronLeft className="h-3.5 w-3.5" />
              </button>

              {/* TEAM TRACK */}

              <div
                ref={teamTrackRef}
                className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-1 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >

                {TEAM.map((member, index) => (

                  <article
                    key={`${member.name}-${index}`}
                    className="w-[calc(50%-10px)] min-w-0 flex-shrink-0 snap-start overflow-hidden rounded-2xl border border-border/30 bg-card shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-primary/30 hover:shadow-xl sm:w-[calc(33.333%-14px)] lg:w-[calc(25%-15px)]"
                  >

                    {/* ------------------------------------------------
                        TEAM PHOTO
                    ------------------------------------------------- */}

                    <div className="group relative h-52 w-full overflow-hidden bg-muted">

                      <Image
                        src={member.image}
                        alt={`${member.name} - ${member.role}`}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />

                      {/* Photo overlay */}

                      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/50 to-transparent" />

                    </div>

                    {/* ------------------------------------------------
                        TEAM DETAILS
                    ------------------------------------------------- */}

                    <div className="relative min-h-[92px] p-4">

                      <h4 className="pr-10 text-sm font-bold text-foreground">
                        {member.name}
                      </h4>

                      <p className="mt-1 text-xs font-medium text-primary">
                        {member.role}
                      </p>

                      {/* Share */}

                      <button
                        type="button"
                        aria-label={`Share ${member.name}'s profile`}
                        className="absolute bottom-4 right-4 flex h-8 w-8 items-center justify-center rounded-full border border-border/50 text-foreground/60 transition-all duration-300 hover:border-primary hover:bg-primary/10 hover:text-primary"
                      >
                        <FaShareNodes className="h-3 w-3" />
                      </button>

                    </div>

                  </article>

                ))}

              </div>

              {/* RIGHT ARROW */}

              <button
                type="button"
                onClick={() => scrollTeam("right")}
                aria-label="Scroll team right"
                className="absolute right-0 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 translate-x-3 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all duration-300 hover:scale-110 hover:bg-primary-hover sm:translate-x-5"
              >
                <FaChevronRight className="h-3.5 w-3.5" />
              </button>

            </div>

          </div>

        </section>

        {/* =====================================================
            NEWSLETTER
        ====================================================== */}

        <section
          data-aos="fade-up"
          className="mt-20 overflow-hidden rounded-3xl border border-border/30 bg-card/50 p-8 shadow-sm transition-colors duration-300 dark:bg-card/40 md:mt-28 md:p-12"
        >

          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-[auto,1fr]">

            {/* Newsletter icon */}

            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 text-5xl md:h-32 md:w-32">
              📬
            </div>

            {/* Newsletter content */}

            <div className="text-center md:text-left">

              <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                Stay Updated
              </span>

              <h2 className="mt-2 text-2xl font-bold text-foreground md:text-3xl">
                Stay in the Loop
              </h2>

              <p className="mt-2 max-w-xl text-sm leading-6 text-foreground/60">
                Get notified when new restaurants join Restor and be the first
                to hear about seasonal offers, new meals and exciting updates.
              </p>

              {/* Newsletter form */}

              <form
                onSubmit={(e) => e.preventDefault()}
                className="mt-5 flex flex-col gap-3 sm:flex-row"
              >

                <label
                  htmlFor="newsletter-email"
                  className="sr-only"
                >
                  Email address
                </label>

                <input
                  id="newsletter-email"
                  type="email"
                  required
                  placeholder="Enter your email"
                  className="min-w-0 flex-1 rounded-full border border-border bg-background px-5 py-3 text-sm text-foreground outline-none transition placeholder:text-foreground/40 focus:border-primary focus:ring-2 focus:ring-primary/20"
                />

                <button
                  type="submit"
                  className="rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:bg-primary-hover hover:shadow-lg"
                >
                  Subscribe
                </button>

              </form>

            </div>

          </div>

        </section>

      </div>

    </main>
  );
}