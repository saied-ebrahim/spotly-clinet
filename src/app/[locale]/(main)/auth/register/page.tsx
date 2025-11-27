import Link from "next/link";
import { FaBuilding, FaUser, FaUserShield } from "react-icons/fa";
import { register } from "@/svg/register";
export default function RegisterIndexPage() {
  const tiles = [
    {
      href: "/auth/register/attendee",
      icon: <FaUser className="text-3xl text-white" />,
      title: "Register as Attendee",
      description: "Discover and attend amazing events",
      isPrimary: true,
    },
    {
      href: "/auth/register/organizer",
      icon: <FaBuilding className="text-3xl text-white" />,
      title: "Register as Organizer",
      description: "Create and manage your events",
      isPrimary: true,
    },
    {
      href: "/auth/register/admin",
      icon: <FaUserShield className="text-3xl text-white" />,
      title: "Register as Admin",
      description: "Manage the platform with admin privileges",
      isPrimary: true,
    },
  ];

  return (
    <div className="min-h-screen w-full bg-[#2B293D] flex flex-col lg:flex-row">
      {/* Left: Illustration - Hidden on mobile */}
      <div className="hidden lg:flex lg:flex-col lg:justify-center lg:items-center lg:w-[40%] lg:min-h-screen bg-[#2B293D] p-6 lg:p-8">
        <div className="w-full max-w-md">
          <span dangerouslySetInnerHTML={{ __html: register }}></span>
        </div>
        <div className="mt-8 text-3xl lg:text-4xl xl:text-5xl text-white flex flex-col font-bold font-monster leading-tight text-center">
          <p>Discover amazing events!</p>
          <p className="mt-4">
            Register to get personalized <br /> event recommendations <br /> and
            manage your bookings <br /> today!
          </p>
        </div>
      </div>

      {/* Right: Form Section */}
      <div className="flex justify-center items-start w-full lg:w-[60%] min-h-screen bg-white lg:rounded-tl-[80px] lg:rounded-bl-[80px] p-6 sm:p-8 md:p-12 lg:p-16">
        <div className="flex flex-col items-center justify-center gap-6 sm:gap-8 w-full max-w-md lg:max-w-lg">
          <div className="w-full">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-monster text-[#2B293D] font-bold">
              Sign Up
            </h1>
          </div>

          <div className="w-full space-y-4">
            {tiles.map((t) => (
              <Link key={t.href} href={t.href} className="group block">
                <div className="rounded-md transition-all duration-300 hover:shadow-md overflow-hidden border-2 border-[#636363] hover:border-[#2B293D]">
                  <div className="bg-white rounded-md px-5 py-5 flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-md flex items-center justify-center ${
                        t.isPrimary ? "bg-[#2B293D]" : "bg-[#2B293D]/10"
                      }`}
                    >
                      {t.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base font-semibold text-gray-900">
                        {t.title}
                      </h3>
                      <p className="text-xs text-gray-500">{t.description}</p>
                    </div>
                    <div
                      className={`text-sm font-medium px-4 py-2 rounded-md transition-all ${
                        t.isPrimary
                          ? "bg-[#2B293D] text-white hover:bg-[#4A4763]"
                          : "bg-white border border-gray-200 text-gray-700 group-hover:bg-gray-50"
                      }`}
                    >
                      Continue
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-6 text-sm text-gray-500 text-center">
            By continuing you agree to our Terms of Service and Privacy Policy.
          </div>
        </div>
      </div>
    </div>
  );
}
