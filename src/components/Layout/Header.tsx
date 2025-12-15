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
import { authService } from "@/services/authService";
import { parseJwt } from "@/shared/jwt";
import { useTranslations } from "next-intl";

export default function Header() {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations('header');
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<{ name?: string; role?: string } | null>(
    null
  );
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const cookie = Cookies.get("sub");
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
          const role = decodedToken.role;
          userData = { ...userData, name, role };
        }

        const currentTime = Date.now() / 1000;

        if (
          decodedToken &&
          decodedToken.exp &&
          decodedToken.exp - currentTime < 3600
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
                  ...newDecodedToken,
                  name:
                    newDecodedToken?.name?.split(" ")[0] ||
                    newDecodedToken?.email?.split("@")[0] ||
                    "User",
                  role: newDecodedToken?.role,
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
      const cookie = Cookies.get("sub");
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

  const nav = [
    { label: t('home'), href: "/" },
    { label: t('events'), href: "/events" },
    { label: t('favorites'), href: "/favorites" },
    { label: t('about'), href: "/about" },
    { label: t('contact'), href: "/contact" },
  ];

  const getDashboardLink = () => {
    if (user?.role === "Admin" || user?.role === "admin") {
      return "/dashboard/admin";
    }
    return "/dashboard/organizer";
  };

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
                    href={getDashboardLink()}
                    className="block px-4 py-2.5 hover:bg-gray-50 transition-colors font-medium"
                    onClick={() => setDropdownOpen(false)}
                  >
                    {t('dashboard')}
                  </Link>
                  <Link
                    href="/auth/Profile"
                    className="block px-4 py-2.5 hover:bg-gray-50 transition-colors font-medium"
                    onClick={() => setDropdownOpen(false)}
                  >
                    {t('profile')}
                  </Link>
                  <Link
                    href="/my-orders"
                    className="block px-4 py-2.5 hover:bg-gray-50 transition-colors font-medium"
                    onClick={() => setDropdownOpen(false)}
                  >
                    {t('myOrders')}
                  </Link>
                  <div className="h-px bg-gray-100 my-1"></div>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2.5 hover:bg-red-50 text-red-600 transition-colors font-medium"
                  >
                    {t('logout')}
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
                {t('login')}
              </Link>

              <Link
                href="/auth/register"
                className="px-4 py-2 bg-yellow-400 text-black rounded-xl font-semibold shadow hover:scale-105 transition text-center"
              >
                {t('signUp')}
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

          {/* LANG SWITCHER */}
          <LanguageSwitcher />

          {user ? (
            <div className="border-t border-gray-700 pt-4 mt-4">
              <div className="flex items-center gap-3 mb-4 text-yellow-400">
                <FaUserCircle className="text-2xl" />
                <span className="font-bold">{user.name}</span>
              </div>
              <Link
                href={getDashboardLink()}
                className="block py-2 hover:text-green-300 transition"
                onClick={() => setOpen(false)}
              >
                {t('dashboard')}
              </Link>
              <Link
                href="/profile"
                className="block py-2 hover:text-green-300 transition"
                onClick={() => setOpen(false)}
              >
                {t('profile')}
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left py-2 text-red-400 hover:text-red-300 transition"
              >
                {t('logout')}
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
                {t('login')}
              </Link>

              {/* SIGN UP */}
              <Link
                href="/auth/register"
                className="w-full py-2 bg-yellow-400 text-black rounded-xl font-semibold shadow text-center block"
              >
                {t('signUp')}
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}
