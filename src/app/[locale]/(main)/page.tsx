"use client";
// import Home from "@/components/homePage/home";
// import HeroSection from "@/components/homePageComponent/HeroSection";
import Categories from "@/components/ui/home/Caregories";

import OnlineEvents from "@/components/ui/home/OnlineEvents";

import PopularEvents from "@/components/ui/home/PopularEvents";

import EgyptTopEvents from "@/components/ui/home/EgyptTopEvents";
import Link from "next/link";

import { IoSparkles } from "react-icons/io5";
import SearchEvent from "@/components/ui/home/SearchEvent";

function Page() {
  return (
    <div className="mt-20">
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
              Don&apos;t miss out!
            </p>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-8 leading-tight">
              Explore relevant <span className="text-yellow-400">events</span>
              happening locally and globally.
            </h1>

            <SearchEvent />
          </div>
        </div>

        <Categories />

        <PopularEvents />

        <OnlineEvents />
        <EgyptTopEvents />

        <section className="py-16 bg-yellow-400">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
              Upgrade Your Learning Journey
            </h2>

            <p className="text-lg text-gray-800 mb-8 font-medium">
              Don&apos;t just browse—become a member. Create an account to track
              your workshops, earn certificates, and get early access to
              limited-seat events.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/auth/register"
                className="inline-flex items-center justify-center bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl transition-transform duration-300 hover:-translate-y-1"
              >
                <IoSparkles className="w-5 h-5 mr-2" />
                Create Free Account
              </Link>

              <Link
                href="/events"
                className="inline-flex items-center justify-center bg-white hover:bg-gray-50 text-gray-900 px-8 py-4 rounded-xl font-bold text-lg shadow-md transition-transform duration-300 hover:-translate-y-1"
              >
                Browse More Events
              </Link>
            </div>
          </div>
        </section>
        {/* <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center sm:text-left mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Trending Events around the World
            </h2>
            <p className="text-gray-500 text-lg">
              What&apos;s happening globally this month
            </p>
          </div>
          <div
            id="trending-events-grid"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          ></div>
          <div className="text-center mt-10">
            <button className="border border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-8 py-3 rounded-xl font-semibold transition duration-200">
              See More Global Events
            </button>
          </div>
        </section> */}
      </main>
    </div>
  );
}

export default Page;
