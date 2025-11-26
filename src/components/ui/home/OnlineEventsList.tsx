import OnlineEventCard from "./OnlineEventCard";
export interface OnlineEvent {
  id: number;
  category: string;
  title: string;
  description: string;
  date: string;
  registeredCount?: string;
  image: string;
  colorSchemeDark?: string;
}

export const online: OnlineEvent[] = [
  {
    id: 101,
    category: "Featured Webinar",
    title: "The Future of MERN Stack",
    description:
      "Explore how MongoDB, Express, React, and Node are evolving in 2026. We will discuss performance optimization and state management at scale.",
    date: "Mon, Nov 24, 2025",
    registeredCount: "12k+", // Added this in case you want to make the "10k+" dynamic
    image:
      "https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&w=800&q=80",
    colorSchemeDark: "from-purple-600 to-indigo-500",
  },
  {
    id: 102,
    category: "Cybersecurity",
    title: "Network Defense Strategies",
    description:
      "A comprehensive guide to securing your infrastructure against modern malware threats. Perfect for IT professionals and network admins.",
    date: "Fri, Jan 10, 2026",
    registeredCount: "8.5k",
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
    colorSchemeDark: "from-blue-600 to-cyan-500",
  },
  {
    id: 103,
    category: "Design System",
    title: "UI/UX Trends for 2026",
    description:
      "Learn how to create accessible and visually stunning interfaces. We cover color theory, typography, and responsive layouts.",
    date: "Wed, Feb 14, 2026",
    registeredCount: "20k+",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80",
    colorSchemeDark: "from-pink-600 to-red-500",
  },
];

export default function OnlineEventsList() {
  return (
    <section className="py-16 pt-0 bg-white border-t border-b border-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center sm:text-left mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Discover Best of Online Events
          </h2>
          <p className="text-gray-500 text-lg">
            Webinars, classNamees, and global virtual gatherings
          </p>
        </div>
        {}
        {online.map((event) => (
          <OnlineEventCard key={event.id} event={event} />
        ))}

        <div className="text-center mt-10">
          <button className="border border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-8 py-3 rounded-xl font-semibold transition duration-200">
            See More Online Events
          </button>
        </div>
      </div>
    </section>
  );
}
