"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

export default function Footer() {
  const locale = useLocale();
  const t = useTranslations("footer");

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
            <h3 className="text-white font-semibold mb-3">{t("companyInfo")}</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-yellow-400">{t("aboutUs")}</Link></li>
              <li><Link href="/contact" className="hover:text-yellow-400">{t("contactUs")}</Link></li>
              <li><Link href="#" className="hover:text-yellow-400">{t("careers")}</Link></li>
              <li><Link href="#" className="hover:text-yellow-400">{t("faqs")}</Link></li>
              <li><Link href="#" className="hover:text-yellow-400">{t("termsOfService")}</Link></li>
              <li><Link href="#" className="hover:text-yellow-400">{t("privacyPolicy")}</Link></li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="text-white font-semibold mb-3">{t("help")}</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-yellow-400">{t("accountSupport")}</Link></li>
              <li><Link href="#" className="hover:text-yellow-400">{t("listingEvents")}</Link></li>
              <li><Link href="#" className="hover:text-yellow-400">{t("eventTicketing")}</Link></li>
              <li>
                <Link href="#" className="hover:text-yellow-400">
                  {t("ticketPurchaseTerms")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold mb-3">{t("categories")}</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-yellow-400">{t("concertsGigs")}</Link></li>
              <li><Link href="#" className="hover:text-yellow-400">{t("festivalsLifestyle")}</Link></li>
              <li><Link href="#" className="hover:text-yellow-400">{t("businessNetworking")}</Link></li>
              <li><Link href="#" className="hover:text-yellow-400">{t("foodDrinks")}</Link></li>
              <li><Link href="#" className="hover:text-yellow-400">{t("performingArts")}</Link></li>
              <li><Link href="#" className="hover:text-yellow-400">{t("sportsOutdoors")}</Link></li>
              <li><Link href="#" className="hover:text-yellow-400">{t("exhibitions")}</Link></li>
              <li><Link href="#" className="hover:text-yellow-400">{t("workshopsConferences")}</Link></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-white font-semibold mb-3">{t("followUs")}</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="https://facebook.com" target="_blank" className="hover:text-yellow-400">{t("facebook")}</Link></li>
              <li><Link href="https://instagram.com" target="_blank" className="hover:text-yellow-400">{t("instagram")}</Link></li>
              <li><Link href="https://twitter.com" target="_blank" className="hover:text-yellow-400">{t("twitter")}</Link></li>
              <li><Link href="https://youtube.com" target="_blank" className="hover:text-yellow-400">{t("youtube")}</Link></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-600 pt-6 text-center text-sm text-gray-400">
          {t("copyright")}
        </div>
      </div>
    </footer>
  );
}
