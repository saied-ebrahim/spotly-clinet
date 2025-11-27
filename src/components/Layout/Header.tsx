"use client";

import { useState } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import SpotlyLogo from "@/components/Layout/SpotlyLogo";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function Header() {
  const pathname = usePathname();
  const locale = useLocale();
  const [open, setOpen] = useState(false);

  const nav = [
    { label: "Home", href: "/" },
    { label: "Events", href: "/events" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 bg-[#181828] text-white shadow-lg ${
        locale === "ar" ? "rtl-header" : "ltr-header"
      }`}
    >
      <div className="header-inner container mx-auto px-6 py-4 flex justify-between items-center">
        {/* LOGO */}
        <div className="flex items-center h-[60px]">
          <Link href="/">
            <SpotlyLogo />
          </Link>
        </div>

        {/* DESKTOP NAV */}
        <nav
          className={`hidden md:flex items-center gap-8 ${
            locale === "ar" ? "flex-row-reverse" : ""
          }`}
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative group transition inline-block"
            >
              {item.label}

              {/* Active underline */}
              {pathname === item.href ? (
                <span
                  className={`absolute -bottom-1 h-[3px] w-full bg-yellow-400 rounded-md ${
                    locale === "ar" ? "right-0" : "left-0"
                  }`}
                ></span>
              ) : (
                <span
                  className={`absolute -bottom-1 h-[3px] w-0 bg-yellow-400 rounded-md group-hover:w-full transition-all duration-300 ${
                    locale === "ar" ? "right-0" : "left-0"
                  }`}
                ></span>
              )}
            </Link>
          ))}

          <LanguageSwitcher />

          <Link href="/auth/login" className="hover:text-green-300 transition">
            Login
          </Link>

          <Link
  href="/auth/register"
  className="px-4 py-2 bg-yellow-400 text-black rounded-xl font-semibold shadow hover:scale-105 transition text-center"
>
  Sign Up
</Link>
        </nav>

        <button
          className="md:hidden text-3xl"
          onClick={() => setOpen((prev) => !prev)}
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-[#1f1f2e] px-6 pb-4 space-y-4 animate-fadeIn gap-3">
          {/* NAV LINKS */}
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative block transition hover:text-green-300 ${
                locale === "ar" ? "text-right" : "text-left"
              }`}
              onClick={() => setOpen(false)}
            >
              {item.label}

              {pathname === item.href && (
                <span
                  className={`absolute bottom-0 h-[3px] bg-yellow-400 rounded-md ${
                    locale === "ar" ? "right-0" : "left-0"
                  }`}
                ></span>
              )}
            </Link>
          ))}

          {/* LANG SWITCHER */}
          <LanguageSwitcher />

          {/* LOGIN */}
          <Link
            href="/auth/login"
            className="block hover:text-green-300 transition"
            onClick={() => setOpen(false)}
          >
            Login
          </Link>

          {/* SIGN UP */}
<Link
  href="/auth/register"
  className="w-full py-2 bg-yellow-400 text-black rounded-xl font-semibold shadow text-center block"
>
  Sign Up
</Link>
        </div>
      )}
    </header>
  );
}
