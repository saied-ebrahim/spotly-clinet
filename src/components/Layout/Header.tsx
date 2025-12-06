"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import SpotlyLogo from "@/components/Layout/SpotlyLogo";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import Cookies from "js-cookie";
import { decryptData, encryptData } from "@/shared/encryption";
import { FaUserCircle, FaChevronDown } from "react-icons/fa";
import { FiStar } from "react-icons/fi";
import { authService } from "@/services/authService";
import { parseJwt } from "@/shared/jwt";
import useFavoriteStore from "@/hooks/useFavorateStore";
export default function Header() {
  const pathname = usePathname();
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<{ name?: string } | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const cookie = Cookies.get("token");
      let userData = null;
      let token = null;
      let storedDeviceID = "";

      if (cookie) {
        try {
          const decrypted = decryptData(cookie) as {
            token?: string;
            user?: { name?: string };
            deviceID?: string;
          };

          if (decrypted && decrypted.token) {
            userData = decrypted.user || { name: "User" };
            token = decrypted.token;
            storedDeviceID = decrypted.deviceID || "";
          }
        } catch (err) {
          console.error("Header: Decryption failed", err);
        }
      }

      if (userData && token) {
        const decodedToken = parseJwt(token);

        // If userData is just the default placeholder, try to get better info from the token
        if (userData.name === "User" && decodedToken) {
          const name =
            decodedToken.name ||
            decodedToken.unique_name ||
            decodedToken.email?.split("@")[0] ||
            "User";
          userData = { ...userData, name };
        }

        const currentTime = Date.now() / 1000;

        if (
          decodedToken &&
          decodedToken.exp &&
          decodedToken.exp - currentTime < 3600 // Refresh if less than 1 hour remains (e.g. after 23h of a 24h token)
        ) {
          console.log("Token expired or expiring soon, refreshing...");
          try {
            const deviceID =
              storedDeviceID || (await authService.getDeviceID());
            if (deviceID) {
              const response = await authService.refreshToken(deviceID);
              if (response.token) {
                const newDecodedToken = parseJwt(response.token);
                const newUser = {
                  name:
                    newDecodedToken?.name?.split(" ")[0] ||
                    newDecodedToken?.email?.split("@")[0] ||
                    "User",
                  ...newDecodedToken,
                };
                const encryptedData = encryptData({
                  token: response.token,
                  deviceID,
                });
                Cookies.set("token", encryptedData, { path: "/" });
                setUser(newUser);
                console.log("Token refreshed successfully");
                return;
              }
            }
          } catch (error) {
            console.log("Token refresh failed:", error);
          }
        }

        setUser(userData);
      }
    };
    checkSession();
    const interval = setInterval(checkSession, 60 * 60 * 1000); // Check every 1 hour
    return () => clearInterval(interval);
  }, [pathname]);
  const handleLogout = async () => {
    try {
      let deviceID = "";
      const cookie = Cookies.get("token");
      if (cookie) {
        const decrypted = decryptData(cookie) as { deviceID?: string };
        deviceID = decrypted.deviceID || "";
      }
      if (!deviceID) {
        deviceID = await authService.getDeviceID();
      }

      if (deviceID) {
        await authService.logout(deviceID);
      }
    } catch (error) {
      console.error("Logout error", error);
    } finally {
      Cookies.remove("token");
      localStorage.removeItem("deviceID");
      setUser(null);
      window.location.href = "/";
    }
  };

  const { favorites } = useFavoriteStore();

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

          {/* Favourites Link - Only show when user is logged in */}
          {user && (
            <Link
              href="/favorites"
              className="relative group transition inline-flex items-center gap-2"
            >
              <FiStar size={18} />
              <span>Favourites</span>
              {favorites.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {favorites.length}
                </span>
              )}

              {/* Active underline */}
              {pathname === "/favorites" ? (
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
          )}

          <LanguageSwitcher />

          {user ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 hover:text-green-300 transition focus:outline-none"
              >
                <FaUserCircle className="text-2xl" />
                <span className="font-medium">{user.name}</span>
                <FaChevronDown
                  className={`text-sm transition-transform duration-200 ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-48 bg-white text-[#181828] rounded-xl shadow-2xl py-2 animate-fadeIn border border-gray-100 overflow-hidden">
                  <Link
                    href="/dashboardHome/Organizer"
                    className="block px-4 py-2.5 hover:bg-gray-50 transition-colors font-medium"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/auth/Profile"
                    className="block px-4 py-2.5 hover:bg-gray-50 transition-colors font-medium"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Profile
                  </Link>
                  <div className="h-px bg-gray-100 my-1"></div>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2.5 hover:bg-red-50 text-red-600 transition-colors font-medium"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="hover:text-green-300 transition"
              >
                Login
              </Link>

              <Link
                href="/auth/register"
                className="px-4 py-2 bg-yellow-400 text-black rounded-xl font-semibold shadow hover:scale-105 transition text-center"
              >
                Sign Up
              </Link>
            </>
          )}
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

          {/* Favourites Link - Mobile - Only show when user is logged in */}
          {user && (
            <Link
              href="/favorites"
              className={`relative flex items-center gap-2 transition hover:text-green-300 ${
                locale === "ar" ? "text-right" : "text-left"
              }`}
              onClick={() => setOpen(false)}
            >
              <FiStar size={18} />
              <span>Favourites</span>
              {favorites.length > 0 && (
                <span className="bg-yellow-400 text-black text-xs font-bold rounded-full px-2 py-0.5">
                  {favorites.length}
                </span>
              )}

              {pathname === "/favorites" && (
                <span
                  className={`absolute bottom-0 h-[3px] bg-yellow-400 rounded-md ${
                    locale === "ar" ? "right-0" : "left-0"
                  }`}
                ></span>
              )}
            </Link>
          )}

          {/* LANG SWITCHER */}
          <LanguageSwitcher />

          {user ? (
            <div className="border-t border-gray-700 pt-4 mt-4">
              <div className="flex items-center gap-3 mb-4 text-yellow-400">
                <FaUserCircle className="text-2xl" />
                <span className="font-bold">{user.name}</span>
              </div>
              <Link
                href="/dashboard"
                className="block py-2 hover:text-green-300 transition"
                onClick={() => setOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                href="/profile"
                className="block py-2 hover:text-green-300 transition"
                onClick={() => setOpen(false)}
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left py-2 text-red-400 hover:text-red-300 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
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
            </>
          )}
        </div>
      )}
    </header>
  );
}
