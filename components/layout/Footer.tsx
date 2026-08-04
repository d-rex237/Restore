import Logo from "./logo";
import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-gray-300">
      <div className="mx-auto max-w-7xl px-6 py-20">

        {/* Top Section */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Company */}
          <div>
            <Logo />

            <p className="mt-6 text-sm leading-7 text-gray-400 max-w-xs">
              Restor connects you with your favorite restaurants and delivers
              delicious meals right to your doorstep — fast, fresh, and reliable.
            </p>

            {/* Social Icons */}
            <div className="mt-6 flex gap-3">
              {[
                { icon: <FaFacebookF />, href: "#" },
                { icon: <FaInstagram />, href: "#" },
                { icon: <FaXTwitter />, href: "#" },
                { icon: <FaLinkedinIn />, href: "#" },
                { icon: <FaYoutube />, href: "#" },
              ].map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 transition hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-500 hover:text-white shadow-md"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-6 text-lg font-semibold text-white border-b border-gray-700 pb-2">
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/" className="hover:text-orange-500">Home</Link></li>
              <li><Link href="/restaurants" className="hover:text-orange-500">Menu</Link></li>
              <li><Link href="/about" className="hover:text-orange-500">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-orange-500">Contact</Link></li>
            </ul>
          </div>

          {/* Customer */}
          <div>
            <h3 className="mb-6 text-lg font-semibold text-white border-b border-gray-700 pb-2">
              Customer
            </h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/sign-in" className="hover:text-orange-500">Login</Link></li>
              <li><Link href="/sign-up" className="hover:text-orange-500">Create Account</Link></li>
              <li><Link href="#" className="hover:text-orange-500">Track Order</Link></li>
              <li><Link href="#" className="hover:text-orange-500">Help Center</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-6 text-lg font-semibold text-white border-b border-gray-700 pb-2">
              Contact
            </h3>
            <div className="space-y-3 text-sm text-gray-400">
              <p>📍 Bamenda, Cameroon</p>
              <p>📞 +237 654905427 / 671 29 2841</p>
              <p>✉ Restorgmt237@gmail.com</p>
              <p>🕒 Mon - Sun: 8:00 AM - 10:00 PM</p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 border-t border-gray-800 pt-6 flex flex-col items-center justify-between gap-4 text-xs text-gray-500 md:flex-row">
          <p>
            © {new Date().getFullYear()} Restor237. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-orange-500">Privacy Policy</Link>
            <Link href="#" className="hover:text-orange-500">Terms & Conditions</Link>
            <Link href="#" className="hover:text-orange-500">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
