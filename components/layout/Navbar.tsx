"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import Logo from "./logo";
import { useTheme } from "next-themes";
import { FaSun, FaMoon, FaSearch, FaShoppingCart, FaChevronDown } from "react-icons/fa"; 

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  // ✅ PROFESSIONAL NAVBAR SEARCH - Scrolls to top and focuses Hero input
  const scrollToHeroSearch = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Waits for scroll to finish, then tries to focus the hero input
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
            href="/restaurants" 
            className={`font-medium transition-colors ${
              isActive("/restaurants") 
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

          {/* ✅ PROFESSIONAL PARTNER DROPDOWN MENU */}
          <div 
            className="relative group"
            ref={dropdownRef}
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <button 
              className="flex items-center gap-1 font-medium text-foreground/80 hover:text-primary transition py-2"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              Partner
              <FaChevronDown className={`w-3 h-3 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {/* Dropdown Menu */}
            <div className={`absolute left-0 top-full mt-2 w-48 bg-background border border-border rounded-xl shadow-xl z-50 overflow-hidden transition-all duration-200 transform ${
              isDropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'
            }`}>
              <Link 
                href="/become-vendor" 
                className="block px-5 py-3 hover:bg-muted transition text-foreground/80 hover:text-primary"
                onClick={() => setIsDropdownOpen(false)}
              >
                Become a Vendor
              </Link>
              <Link 
                href="/become-driver" 
                className="block px-5 py-3 hover:bg-muted transition text-foreground/80 hover:text-primary border-t border-border/30"
                onClick={() => setIsDropdownOpen(false)}
              >
                Become a Driver
              </Link>
            </div>
          </div>
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          
          {/* ✅ CART ICON */}
          <Link
            href="/cart"
            className="hidden sm:block relative rounded-full border border-border p-3 hover:border-primary hover:text-primary transition text-foreground/80"
          >
            <FaShoppingCart className="w-4 h-4" />
            {/* Red Badge (Change 2 to your actual cart count) */}
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold border-2 border-background">
              2
            </span>
          </Link>
          
          {/* ✅ PROFESSIONAL SEARCH BUTTON - NO DROPDOWN, just scrolls up */}
          <div className="hidden sm:block relative">
            <button 
              onClick={scrollToHeroSearch}
              className="rounded-full border border-border p-3 hover:border-primary hover:text-primary transition text-foreground/80"
              aria-label="Search"
            >
              <FaSearch className="w-4 h-4" />
            </button>
          </div>

          {/* Theme Toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full p-2 border border-border hover:border-primary hover:text-primary transition flex items-center justify-center text-foreground/80"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <FaSun className="w-4 h-4" /> : <FaMoon className="w-4 h-4" />}
            </button>
          )}

          {/* Sign In */}
          <Link
            href="/sign-in"
            className="hidden sm:block rounded-lg bg-primary px-6 py-2.5 font-semibold text-primary-foreground hover:bg-primary-hover transition"
          >
            Sign In
          </Link>

          {/* Hamburger Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden flex flex-col gap-1.5 p-2"
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
          <Link href="/restaurants" onClick={closeMenu} className={`font-medium transition-colors ${isActive("/restaurants") ? "text-primary" : "text-foreground/80 hover:text-primary"}`}>Restaurants</Link>
          <Link href="/about" onClick={closeMenu} className={`font-medium transition-colors ${isActive("/about") ? "text-primary" : "text-foreground/80 hover:text-primary"}`}>About</Link>
          <Link href="/services" onClick={closeMenu} className={`font-medium transition-colors ${isActive("/services") ? "text-primary" : "text-foreground/80 hover:text-primary"}`}>Services</Link>
          <Link href="/contact" onClick={closeMenu} className={`font-medium transition-colors ${isActive("/contact") ? "text-primary" : "text-foreground/80 hover:text-primary"}`}>Contact</Link>
          
          {/* ✅ MOBILE MENU PARTNER OPTIONS */}
          <div className="border-t border-border/30 pt-3 mt-1">
            <Link href="/become-vendor" onClick={closeMenu} className="block font-medium text-foreground/80 hover:text-primary transition py-2">Become a Vendor</Link>
            <Link href="/become-driver" onClick={closeMenu} className="block font-medium text-foreground/80 hover:text-primary transition py-2">Become a Driver</Link>
          </div>
          
          <Link href="/sign-in" onClick={closeMenu} className="rounded-lg bg-primary px-5 py-3 text-center font-semibold text-primary-foreground">Sign In</Link>
        </nav>
      </div>
    </header>
  );
}