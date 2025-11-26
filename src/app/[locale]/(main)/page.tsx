"use client";
// import Home from "@/components/homePage/home";
// import HeroSection from "@/components/homePageComponent/HeroSection";
import Categories from "@/components/ui/home/Caregories";
import EventSelector from "@/components/ui/home/EventSelector";
import LocationSelector from "@/components/ui/home/LocationSelector";
import OnlineEventsList from "@/components/ui/home/OnlineEventsList";
import PopularEvents from "@/components/ui/home/PopularEvents";
import useGeolocation from "@/hooks/useGeolocation";
import Image from "next/image";

function Page() {
  return (
    <div>
      <main>
        <div className="relative bg-gray-900 py-24 sm:py-32">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-40"
            style={{
              backgroundImage:
                "url('https://placehold.co/1920x600/1f2937/white?text=Events+Crowd')",
            }}
          ></div>
          <div className="absolute inset-0 bg-black/50"></div>

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-xl sm:text-2xl font-light text-yellow-300 mb-2">
              Don&apos;t miss out!
            </p>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-8 leading-tight">
              Explore relevant <span className="text-yellow-400">events</span>
              happening locally and globally.
            </h1>

            <div className="flex flex-col sm:flex-row flex-wrap bg-white p-2 rounded-xl shadow-2xl space-y-3 sm:space-y-0 sm:space-x-2 gap-2">
              <EventSelector />
              <LocationSelector />
              <button className="bg-indigo-600 grow hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-xl sm:rounded-r-lg shadow-lg transition duration-200 w-full sm:w-auto shrink-0">
                Search
              </button>
            </div>
          </div>
        </div>

        <Categories />

        {/* <div className="min-h-screen bg-gray-50 p-4 sm:p-10">
      
    </div> */}

        <PopularEvents />

        <OnlineEventsList />
        <section className="py-16 bg-yellow-400">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
              Events specially curated for you!
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Tell us your interests and we&apos;ll notify you about the best
              new events.
            </p>
            <button className="bg-gray-900 hover:bg-gray-700 text-white px-10 py-3 rounded-xl font-bold text-lg shadow-xl transition duration-300 transform hover:scale-105">
              Get Started
            </button>
          </div>
        </section>

        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
        </section>
      </main>
    </div>
  );
}

export default Page;
