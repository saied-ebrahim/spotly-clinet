"use client";

import Link from "next/link";
import { useLocale } from "next-intl";

export default function Footer() {
  const locale = useLocale();

  return (
    <footer
      className={`bg-[#1f1f2e] text-gray-300 pt-10 pb-6   
      ${locale === "ar" ? "rtl" : "ltr"}`}
    >
      <div className="container mx-auto px-6">
        {/* GRID */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10
          ${locale === "ar" ? "text-right" : "text-left"}`}
        >
          {/* Company Info */}
          <div>
            <h3 className="text-white font-semibold mb-3">Company Info</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-yellow-400">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-yellow-400">Contact Us</Link></li>
              <li><Link href="#" className="hover:text-yellow-400">Careers</Link></li>
              <li><Link href="#" className="hover:text-yellow-400">FAQs</Link></li>
              <li><Link href="#" className="hover:text-yellow-400">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-yellow-400">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="text-white font-semibold mb-3">Help</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-yellow-400">Account Support</Link></li>
              <li><Link href="#" className="hover:text-yellow-400">Listing Events</Link></li>
              <li><Link href="#" className="hover:text-yellow-400">Event Ticketing</Link></li>
              <li>
                <Link href="#" className="hover:text-yellow-400">
                  Ticket Purchase Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold mb-3">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-yellow-400">Concerts & Gigs</Link></li>
              <li><Link href="#" className="hover:text-yellow-400">Festivals & Lifestyle</Link></li>
              <li><Link href="#" className="hover:text-yellow-400">Business & Networking</Link></li>
              <li><Link href="#" className="hover:text-yellow-400">Food & Drinks</Link></li>
              <li><Link href="#" className="hover:text-yellow-400">Performing Arts</Link></li>
              <li><Link href="#" className="hover:text-yellow-400">Sports & Outdoors</Link></li>
              <li><Link href="#" className="hover:text-yellow-400">Exhibitions</Link></li>
              <li><Link href="#" className="hover:text-yellow-400">Workshops, Conferences & Classes</Link></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-white font-semibold mb-3">Follow Us</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="https://facebook.com" target="_blank" className="hover:text-yellow-400">Facebook</Link></li>
              <li><Link href="https://instagram.com" target="_blank" className="hover:text-yellow-400">Instagram</Link></li>
              <li><Link href="https://twitter.com" target="_blank" className="hover:text-yellow-400">Twitter</Link></li>
              <li><Link href="https://youtube.com" target="_blank" className="hover:text-yellow-400">YouTube</Link></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-600 pt-6 text-center text-sm text-gray-400">
          ©2024 Spotly. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
