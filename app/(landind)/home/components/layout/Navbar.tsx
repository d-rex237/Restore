"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import Logo from "./logo";
import { useTheme } from "next-themes";
import { FaSun, FaMoon, FaSearch, FaShoppingCart, FaChevronDown } from "react-icons/fa";
import { useCart } from "@/lib/cart-context";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { getCartCount, toggleCart } = useCart();

  useEffect(() => {
    setMounted(true);
  }, []);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  const scrollToHeroSearch = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      const heroInput = document.getElementById('hero-search-input');
      if (heroInput) {
        heroInput.focus();
      }
    }, 500);
  };

  if (!mounted) return null;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/90 backdrop-blur-md shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        
        {/* Logo */}
        <Logo />

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          <Link 
            href="/" 
            className={`font-medium transition-colors ${
              isActive("/") 
                ? "text-primary border-b-2 border-primary pb-1" 
                : "text-foreground/80 hover:text-primary"
            }`}
          >
            Home
          </Link>
          <Link 
            href="/menu" 
            className={`font-medium transition-colors ${
              isActive("/menu") 
                ? "text-primary border-b-2 border-primary pb-1" 
                : "text-foreground/80 hover:text-primary"
            }`}
          >
            Menu
          </Link>
          <Link 
            href="/about" 
            className={`font-medium transition-colors ${
              isActive("/about") 
                ? "text-primary border-b-2 border-primary pb-1" 
                : "text-foreground/80 hover:text-primary"
            }`}
          >
            About
          </Link>
          <Link 
            href="/services" 
            className={`font-medium transition-colors ${
              isActive("/services") 
                ? "text-primary border-b-2 border-primary pb-1" 
                : "text-foreground/80 hover:text-primary"
            }`}
          >
            Services
          </Link>
          <Link 
            href="/contact" 
            className={`font-medium transition-colors ${
              isActive("/contact") 
                ? "text-primary border-b-2 border-primary pb-1" 
                : "text-foreground/80 hover:text-primary"
            }`}
          >
            Contact
          </Link>
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          
          {/* ✅ CART ICON - Toggles the Cart Sidebar */}
          <button 
            onClick={toggleCart}
            className="hidden sm:block relative rounded-full border border-border p-3 hover:border-primary hover:text-primary transition text-foreground/80"
          >
            <FaShoppingCart className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold border-2 border-background">
              {getCartCount()}
            </span>
          </button>
          
          {/* Search Button */}
          <button 
            onClick={scrollToHeroSearch}
            className="hidden sm:block rounded-full border border-border p-3 hover:border-primary hover:text-primary transition text-foreground/80"
          >
            <FaSearch className="w-4 h-4" />
          </button>

          {/* Theme Toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full p-2 border border-border hover:border-primary hover:text-primary transition flex items-center justify-center text-foreground/80"
            >
              {theme === "dark" ? <FaSun className="w-4 h-4" /> : <FaMoon className="w-4 h-4" />}
            </button>
          )}

          <Link
            href="/sign-in"
            className="hidden sm:block rounded-lg bg-primary px-6 py-2.5 font-semibold text-primary-foreground hover:bg-primary-hover transition"
          >
            Sign In
          </Link>

          {/* Hamburger Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden flex flex-col gap-1.5 p-2 cursor-pointer hover:bg-muted/50 rounded-lg transition-colors"
          >
            <span className={`block h-0.5 w-6 bg-foreground transition-all duration-300 ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block h-0.5 w-6 bg-foreground transition-all duration-300 ${isMenuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-6 bg-foreground transition-all duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden overflow-hidden transition-all duration-300 ${isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"}`}>
        <nav className="flex flex-col gap-5 px-6 py-6 bg-background border-t border-border">
          <Link href="/" onClick={closeMenu} className={`font-medium transition-colors ${isActive("/") ? "text-primary" : "text-foreground/80 hover:text-primary"}`}>Home</Link>
          <Link href="/menu" onClick={closeMenu} className={`font-medium transition-colors ${isActive("/menu") ? "text-primary" : "text-foreground/80 hover:text-primary"}`}>Menu</Link>
          <Link href="/about" onClick={closeMenu} className={`font-medium transition-colors ${isActive("/about") ? "text-primary" : "text-foreground/80 hover:text-primary"}`}>About</Link>
          <Link href="/services" onClick={closeMenu} className={`font-medium transition-colors ${isActive("/services") ? "text-primary" : "text-foreground/80 hover:text-primary"}`}>Services</Link>
          <Link href="/contact" onClick={closeMenu} className={`font-medium transition-colors ${isActive("/contact") ? "text-primary" : "text-foreground/80 hover:text-primary"}`}>Contact</Link>
        </nav>
      </div>
    </header>
  );
}