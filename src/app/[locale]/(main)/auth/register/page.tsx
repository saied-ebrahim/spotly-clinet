import Link from "next/link";
import { FaBuilding, FaUser, FaUserShield } from "react-icons/fa";
import { register } from "@/svg/register";
import TypewriterText from "@/components/auth/TypewriterText";

export default function RegisterIndexPage() {
  const tiles = [
    {
      href: "/auth/register/attendee",
      icon: <FaUser className="text-2xl text-white" />,
      title: "Register as Attendee",
      description: "Discover and attend amazing events",
      isPrimary: true,
    },
    {
      href: "/auth/register/organizer",
      icon: <FaBuilding className="text-2xl text-white" />,
      title: "Register as Organizer",
      description: "Create and manage your events",
      isPrimary: true,
    },
    {
      href: "/auth/register/admin",
      icon: <FaUserShield className="text-2xl text-white" />,
      title: "Register as Admin",
      description: "Manage the platform with admin privileges",
      isPrimary: true,
    },
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#2B293D] via-[#3a3850] to-[#2B293D] flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Logo/Brand Section */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-32 h-32 mb-4">
            <span dangerouslySetInnerHTML={{ __html: register }}></span>
          </div>
          <h1 className="text-3xl md:text-4xl font-monster text-white font-bold text-center mb-2">
            Create Your Account
          </h1>
          <TypewriterText />
        </div>

        {/* Registration Options Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
          <h2 className="text-2xl font-monster text-[#2B293D] font-bold mb-6 text-center">
            Choose Your Role
          </h2>

          <div className="space-y-4">
            {tiles.map((t) => (
              <Link key={t.href} href={t.href} className="group block">
                <div className="rounded-xl transition-all duration-300 hover:shadow-lg overflow-hidden border-2 border-gray-200 hover:border-[#2B293D] hover:scale-[1.02]">
                  <div className="bg-white rounded-xl px-5 py-4 flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center ${
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
                    <div className="text-sm font-medium px-4 py-2 rounded-lg bg-[#2B293D] text-white group-hover:bg-[#4A4763] transition-all">
                      Continue
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-6 text-xs text-gray-500 text-center">
            By continuing you agree to our Terms of Service and Privacy Policy.
          </div>

          <div className="flex items-center justify-center gap-2 mt-6 pt-6 border-t border-gray-200">
            <span className="text-sm text-gray-600">
              Already have an account?
            </span>
            <Link
              href="/auth/login"
              className="text-sm text-[#2B293D] font-semibold hover:text-[#4A4763] hover:underline transition-colors duration-150"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
