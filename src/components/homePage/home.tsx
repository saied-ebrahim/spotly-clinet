"use client";
import Categories from "@/components/ui/home/Caregories";
import PopularEvents from "@/components/ui/home/PopularEvents";
import LocationSelector from "@/components/ui/home/LocationSelector";
import EventSelector from "@/components/ui/home/EventSelector";
import useGeolocation from "@/hooks/useGeolocation";

const Home = () => {
  const { location, error, loading } = useGeolocation(); // Custom hook to get user's location
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
              <LocationSelector location={location?.city} />
              <button className="bg-indigo-600 grow hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-xl sm:rounded-r-lg shadow-lg transition duration-200 w-full sm:w-auto flex-shrink-0">
                Search
              </button>
            </div>
          </div>
        </div>
        {/*  */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Categories />
        </section>
        {/* <div className="min-h-screen bg-gray-50 p-4 sm:p-10">
      
    </div> */}

        {/*  */}

        <section className="py-16 pt-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PopularEvents location={location?.city} />
        </section>

        <section className="py-16 bg-white border-t border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center sm:text-left mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Discover Best of Online Events
              </h2>
              <p className="text-gray-500 text-lg">
                Webinars, classNamees, and global virtual gatherings
              </p>
            </div>

            <div className="mb-10 bg-gradient-to-r from-emerald-600 to-teal-500 p-6 sm:p-8 rounded-2xl shadow-xl flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-8">
              <div className="lg:w-1/3 w-full">
                <img
                  src="https://placehold.co/400x200/065F46/white?text=Featured+Webinar"
                  alt="Featured Webinar"
                  className="rounded-lg w-full object-cover shadow-lg"
                />
              </div>
              <div className="lg:w-2/3 text-white">
                <span className="inline-block bg-yellow-300 text-emerald-900 text-xs font-bold px-3 py-1 rounded-full mb-2 uppercase">
                  Featured Webinar
                </span>
                <h3 className="text-3xl font-extrabold mb-3">
                  Next-Level Marketing Strategies 2026
                </h3>
                <p className="mb-4 text-emerald-100">
                  Join industry leaders for a live webinar on future-proofing
                  your digital marketing skills. Limited free slots available!
                </p>
                <div className="flex items-center space-x-6 text-sm">
                  <span className="flex items-center font-medium">
                    <i data-lucide="calendar" className="w-4 h-4 mr-1"></i> Mon,
                    Dec 9, 2025
                  </span>
                  <span className="flex items-center font-medium">
                    <i data-lucide="users" className="w-4 h-4 mr-1"></i> 10k+
                    Registered
                  </span>
                </div>
              </div>
            </div>

            <div
              id="online-events-grid"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            ></div>

            <div className="text-center mt-10">
              <button className="border border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-8 py-3 rounded-xl font-semibold transition duration-200">
                See More Online Events
              </button>
            </div>
          </div>
        </section>

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
};

export default Home;
