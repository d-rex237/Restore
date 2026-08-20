"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import {
  FaSun,
  FaMoon,
  FaSearch,
  FaShoppingCart,
} from "react-icons/fa";

import Logo from "./logo";
import { useCart } from "@/lib/cart-context";
import {
  Show,
  SignInButton,
  SignUpButton,
} from "@clerk/nextjs";
import ProfileAvatar from "@/components/ProfileAvatar";

export default function Navbar() {
  const pathname = usePathname();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { theme, setTheme } = useTheme();
  const { getCartCount, toggleCart } = useCart();

  useEffect(() => {
    setMounted(true);
  }, []);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }

    return pathname === path || pathname.startsWith(path + "/");
  };

  const scrollToHeroSearch = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    window.setTimeout(() => {
      const input = document.getElementById("hero-search-input");

      if (input instanceof HTMLInputElement) {
        input.focus();
      }
    }, 500);
  };

  if (!mounted) {
    return (
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-xl">
        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Logo />
        </div>
      </header>
    );
  }

  const cartCount =
    typeof getCartCount === "function"
      ? getCartCount()
      : 0;

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header
      className="
        sticky top-0 z-50 w-full
        border-b border-border/70
        bg-background/90
        shadow-sm
        backdrop-blur-xl
      "
    >
      <div
        className="
          mx-auto flex h-[76px] max-w-7xl
          items-center justify-between
          px-4 sm:px-6 lg:px-8
        "
      >
        {/* =====================================================
            LOGO
        ====================================================== */}
        <Link
          href="/"
          onClick={closeMenu}
          className="
            flex items-center
            transition-transform duration-300
            hover:scale-[1.02]
          "
        >
          <Logo />
        </Link>

        {/* =====================================================
            DESKTOP NAVIGATION
        ====================================================== */}
        <nav className="hidden items-center gap-1 lg:flex">
          <NavLink
            href="/"
            label="Home"
            active={isActive("/")}
          />

         <NavLink
  href="/home/restaurants"
  label="Restaurants"
  active={isActive("/home/restaurants")}
/>

          <NavLink
            href="/home/about"
            label="About"
            active={isActive("/home/about")}
          />

          <NavLink
            href="/home/services"
            label="Services"
            active={isActive("/home/services")}
          />

          <NavLink
            href="/home/contact"
            label="Contact"
            active={isActive("/home/contact")}
          />

          {/* =================================================
              DRIVER
              Only visible when signed in
          ================================================== */}
          <Show when="signed-in">
            <NavLink
              href="/home/driver"
              label="Driver"
              active={isActive("/home/driver")}
            />
          </Show>
        </nav>

        {/* =====================================================
            RIGHT CONTROLS
        ====================================================== */}
        <div className="flex items-center gap-2">

          {/* CART */}
          <button
            type="button"
            onClick={toggleCart}
            aria-label="Open shopping cart"
            className="
              group relative hidden h-10 w-10
              items-center justify-center
              rounded-xl border border-border
              bg-background/50
              text-foreground/70
              transition-all duration-300
              hover:-translate-y-0.5
              hover:border-primary
              hover:bg-primary/10
              hover:text-primary
              active:scale-95
              sm:flex
            "
          >
            <FaShoppingCart className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />

            {cartCount > 0 && (
              <span
                className="
                  absolute -right-1.5 -top-1.5
                  flex h-5 min-w-5
                  items-center justify-center
                  rounded-full
                  bg-primary
                  px-1
                  text-[10px]
                  font-bold
                  text-primary-foreground
                  ring-2 ring-background
                "
              >
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </button>

          {/* SEARCH */}
          <button
            type="button"
            onClick={scrollToHeroSearch}
            aria-label="Search"
            className="
              group hidden h-10 w-10
              items-center justify-center
              rounded-xl border border-border
              bg-background/50
              text-foreground/70
              transition-all duration-300
              hover:-translate-y-0.5
              hover:border-primary
              hover:bg-primary/10
              hover:text-primary
              active:scale-95
              sm:flex
            "
          >
            <FaSearch className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
          </button>

          {/* THEME */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={
              theme === "dark"
                ? "Switch to light mode"
                : "Switch to dark mode"
            }
            className="
              group flex h-10 w-10
              items-center justify-center
              rounded-xl border border-border
              bg-background/50
              text-foreground/70
              transition-all duration-300
              hover:-translate-y-0.5
              hover:border-primary
              hover:bg-primary/10
              hover:text-primary
              active:scale-95
            "
          >
            {theme === "dark" ? (
              <FaSun className="h-4 w-4 transition-transform duration-500 group-hover:rotate-45" />
            ) : (
              <FaMoon className="h-4 w-4 transition-transform duration-500 group-hover:-rotate-12" />
            )}
          </button>

          {/* =================================================
              SIGNED OUT
          ================================================== */}
          <Show when="signed-out">
            <SignInButton mode="modal">
              <button
                className="
                  hidden sm:block
                  rounded-lg
                  border border-border
                  px-5 py-2.5
                  text-sm font-semibold
                  text-foreground/80
                  transition
                  hover:border-primary
                  hover:text-primary
                "
              >
                Sign In
              </button>
            </SignInButton>

            <SignUpButton mode="modal">
              <button
                className="
                  hidden sm:block
                  rounded-lg
                  bg-primary
                  px-6 py-2.5
                  text-sm font-semibold
                  text-primary-foreground
                  transition
                  hover:bg-primary-hover
                "
              >
                Sign Up
              </button>
            </SignUpButton>
          </Show>

          {/* =================================================
              SIGNED IN
          ================================================== */}
          <Show when="signed-in">
            <div className="hidden items-center sm:flex">
              <ProfileAvatar />
            </div>
          </Show>

          {/* =================================================
              MOBILE MENU TOGGLE
          ================================================== */}
          <button
            type="button"
            onClick={() =>
              setIsMenuOpen((prev) => !prev)
            }
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
            className="
              group flex h-10 w-10
              flex-col items-center justify-center
              gap-1.5
              rounded-xl border border-border
              bg-background/50
              transition-all duration-300
              hover:border-primary
              hover:bg-primary/10
              lg:hidden
            "
          >
            <span
              className={`h-0.5 w-5 rounded-full bg-foreground transition-all duration-300 ${
                isMenuOpen
                  ? "translate-y-2 rotate-45 bg-primary"
                  : "group-hover:bg-primary"
              }`}
            />

            <span
              className={`h-0.5 w-5 rounded-full bg-foreground transition-all duration-300 ${
                isMenuOpen
                  ? "opacity-0"
                  : "group-hover:bg-primary"
              }`}
            />

            <span
              className={`h-0.5 w-5 rounded-full bg-foreground transition-all duration-300 ${
                isMenuOpen
                  ? "-translate-y-2 -rotate-45 bg-primary"
                  : "group-hover:bg-primary"
              }`}
            />
          </button>
        </div>
      </div>

      {/* =====================================================
          MOBILE MENU
      ====================================================== */}
      <div
        className={`
          overflow-hidden
          border-t border-border/60
          transition-all duration-300
          lg:hidden
          ${
            isMenuOpen
              ? "max-h-[700px] opacity-100"
              : "max-h-0 opacity-0"
          }
        `}
      >
        <nav className="bg-background/95 px-4 py-4 backdrop-blur-xl">

          <MobileNavLink
            href="/"
            label="Home"
            active={isActive("/")}
            onClick={closeMenu}
          />

        
  <MobileNavLink
    href="/home/restaurants"
    label="Restaurants"
    active={isActive("/home/restaurants")}
    onClick={closeMenu}
  />

          <MobileNavLink
            href="/home/about"
            label="About"
            active={isActive("/home/about")}
            onClick={closeMenu}
          />

          <MobileNavLink
            href="/home/services"
            label="Services"
            active={isActive("/home/services")}
            onClick={closeMenu}
          />

          <MobileNavLink
            href="/home/contact"
            label="Contact"
            active={isActive("/home/contact")}
            onClick={closeMenu}
          />

          {/* =================================================
              MOBILE DRIVER
          ================================================== */}
          <Show when="signed-in">
            <MobileNavLink
              href="/home/driver"
              label="Driver"
              active={isActive("/home/driver")}
              onClick={closeMenu}
            />
          </Show>

          {/* MOBILE ACTIONS */}
          <div className="mt-3 grid grid-cols-2 gap-2 border-t border-border/60 pt-4">

            {/* CART */}
            <button
              type="button"
              onClick={() => {
                toggleCart();
                closeMenu();
              }}
              className="
                group flex items-center justify-center gap-2
                rounded-xl border border-border
                bg-background
                px-4 py-3
                text-sm font-semibold
                text-foreground/75
                transition-all duration-300
                hover:border-primary
                hover:bg-primary/10
                hover:text-primary
                active:scale-95
              "
            >
              <FaShoppingCart className="transition-transform group-hover:scale-110" />

              <span>Cart</span>

              {cartCount > 0 && (
                <span className="rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-bold text-primary-foreground">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </button>

            {/* THEME */}
            <button
              type="button"
              onClick={toggleTheme}
              className="
                group flex items-center justify-center gap-2
                rounded-xl border border-border
                bg-background
                px-4 py-3
                text-sm font-semibold
                text-foreground/75
                transition-all duration-300
                hover:border-primary
                hover:bg-primary/10
                hover:text-primary
                active:scale-95
              "
            >
              {theme === "dark" ? (
                <>
                  <FaSun className="transition-transform duration-500 group-hover:rotate-45" />
                  Light
                </>
              ) : (
                <>
                  <FaMoon className="transition-transform duration-500 group-hover:-rotate-12" />
                  Dark
                </>
              )}
            </button>
          </div>

          {/* =================================================
              MOBILE AUTH
          ================================================== */}
          <div className="mt-3">

            <Show when="signed-out">
              <div className="grid grid-cols-2 gap-2">

                <SignInButton mode="modal">
                  <button
                    onClick={closeMenu}
                    className="
                      rounded-xl
                      border border-border
                      px-4 py-3.5
                      text-sm font-bold
                      text-foreground/80
                      transition
                      hover:border-primary
                      hover:text-primary
                    "
                  >
                    Sign In
                  </button>
                </SignInButton>

                <SignUpButton mode="modal">
                  <button
                    onClick={closeMenu}
                    className="
                      rounded-xl
                      bg-primary
                      px-4 py-3.5
                      text-sm font-bold
                      text-primary-foreground
                      transition
                      hover:bg-primary-hover
                    "
                  >
                    Sign Up
                  </button>
                </SignUpButton>

              </div>
            </Show>

            <Show when="signed-in">
              <div className="flex justify-center">
                <ProfileAvatar />
              </div>
            </Show>

          </div>
        </nav>
      </div>
    </header>
  );
}

/* =========================================================
   DESKTOP NAV LINK
========================================================= */

function NavLink({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={`
        group relative
        flex items-center
        rounded-xl
        px-4 py-2.5
        text-sm font-semibold
        transition-all duration-300
        ${
          active
            ? "bg-primary/10 text-primary"
            : "text-foreground/70 hover:bg-primary/10 hover:text-primary"
        }
      `}
    >
      {label}

      <span
        className={`
          absolute bottom-1 left-1/2
          h-0.5 -translate-x-1/2
          rounded-full bg-primary
          transition-all duration-300
          ${active ? "w-5" : "w-0 group-hover:w-5"}
        `}
      />
    </Link>
  );
}

/* =========================================================
   MOBILE NAV LINK
========================================================= */

function MobileNavLink({
  href,
  label,
  active,
  onClick,
}: {
  href: string;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`
        mb-1
        flex items-center
        rounded-xl
        px-4 py-3.5
        text-sm font-semibold
        transition-all duration-300
        ${
          active
            ? "bg-primary/10 text-primary"
            : "text-foreground/75 hover:bg-primary/10 hover:pl-5 hover:text-primary"
        }
      `}
    >
      {label}
    </Link>
  );
}