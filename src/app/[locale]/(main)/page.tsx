"use client";

import Categories from "@/components/ui/home/Caregories";

import Link from "next/link";

import { IoSparkles } from "react-icons/io5";
import SearchEvent from "@/components/ui/home/SearchEvent";
import ParentComp from "@/components/ui/home/ParentComp";
import { useTranslations } from "next-intl";

function Page() {
  const t = useTranslations("homePage");

  return (
    <div>
      <main>
        <div className="relative bg-gray-900 py-24 sm:py-32">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-40"
            style={{
              backgroundImage: "url('/hero.png')",
            }}
          ></div>
          <div className="absolute inset-0 bg-black/30"></div>

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-xl sm:text-2xl font-light text-yellow-300 mb-2">
              {t("hero.subtitle")}
            </p>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-8 leading-tight">
              {t("hero.title")}{" "}
              <span className="text-yellow-400">{t("hero.titleHighlight")}</span>{" "}
              {t("hero.titleSuffix")}
            </h1>

            <SearchEvent />
          </div>
        </div>

        <Categories />
        <ParentComp/>

        <section className="py-16 bg-yellow-400">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
              {t("cta.title")}
            </h2>

            <p className="text-lg text-gray-800 mb-8 font-medium">
              {t("cta.description")}
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/auth/register"
                className="inline-flex items-center justify-center bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl transition-transform duration-300 hover:-translate-y-1"
              >
                <IoSparkles className="w-5 h-5 mr-2" />
                {t("cta.createAccount")}
              </Link>

              <Link
                href="/events"
                className="inline-flex items-center justify-center bg-white hover:bg-gray-50 text-gray-900 px-8 py-4 rounded-xl font-bold text-lg shadow-md transition-transform duration-300 hover:-translate-y-1"
              >
                {t("cta.browseEvents")}
              </Link>
            </div>
          </div>
        </section>
       
      </main>
    </div>
  );
}

export default Page;
