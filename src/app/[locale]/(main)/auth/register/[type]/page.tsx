import { useTranslations } from "next-intl";
import AttendeeRegisterForm from "@/components/forms/AttendeeRegisterForm";
import OrganizerRegisterForm from "@/components/forms/OrganizerRegisterForm";
import AdminRegisterForm from "@/components/forms/AdminRegisterForm";
import { FaBuilding, FaUser, FaUserShield } from "react-icons/fa";
import { actor } from "@/svg/actor";
import { redirect } from "next/navigation";
import TypewriterText from "@/components/auth/TypewriterText";

export default async function RegisterPage({
  params,
}: {
  params: Promise<{
    type: "attendee" | "organizer" | "admin";
    locale: string;
  }>;
}) {
  const { type } = await params;

  return <RegisterFormComponent type={type} />;
}

const RegisterFormComponent = ({
  type,
}: {
  type: "attendee" | "organizer" | "admin";
}) => {
  const t = useTranslations("");

  // Handle invalid type
  if (!["attendee", "organizer", "admin"].includes(type)) {
    redirect("/auth/register");
  }

  // Determine icon based on type
  const getIcon = () => {
    switch (type) {
      case "attendee":
        return <FaUser className="text-3xl text-white" />;
      case "organizer":
        return <FaBuilding className="text-3xl text-white" />;
      case "admin":
        return <FaUserShield className="text-3xl text-white" />;
      default:
        return <FaUser className="text-3xl text-white" />;
    }
  };

  // Determine title based on type
  const getTitle = () => {
    switch (type) {
      case "attendee":
        return "Join as Attendee";
      case "organizer":
        return "Become an Organizer";
      case "admin":
        return "Admin Access";
      default:
        return "";
    }
  };

  // Determine description based on type
  const getDescription = () => {
    switch (type) {
      case "attendee":
        return "Discover and book amazing events";
      case "organizer":
        return "Create and manage your events";
      case "admin":
        return "Manage platform operations";
      default:
        return "";
    }
  };

  // Determine illustration based on type
  const getIllustration = () => actor;

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#2B293D] via-[#3a3850] to-[#2B293D] flex items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        {/* Logo/Brand Section */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-24 h-24 mb-4 flex items-center justify-center bg-white/10 rounded-full p-4">
            {getIcon()}
          </div>
          <h1 className="text-3xl md:text-4xl font-monster text-white font-bold text-center mb-2">
            {getTitle()}
          </h1>
          <TypewriterText />
        </div>

        {/* Registration Form Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
          {type === "attendee" ? (
            <AttendeeRegisterForm />
          ) : type === "organizer" ? (
            <OrganizerRegisterForm />
          ) : type === "admin" ? (
            <AdminRegisterForm />
          ) : null}
        </div>
      </div>
    </div>
  );
};
