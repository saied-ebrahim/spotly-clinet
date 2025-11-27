import { useTranslations } from "next-intl";
import AttendeeRegisterForm from "@/components/forms/AttendeeRegisterForm";
import OrganizerRegisterForm from "@/components/forms/OrganizerRegisterForm";
import AdminRegisterForm from "@/components/forms/AdminRegisterForm";
import { FaBuilding, FaUser, FaUserShield } from "react-icons/fa";
import { actor } from "@/svg/actor";
import { redirect } from "next/navigation";

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
        return <FaUser className="text-2xl text-dark" />;
      case "organizer":
        return <FaBuilding className="text-2xl text-dark" />;
      case "admin":
        return <FaUserShield className="text-2xl text-dark" />;
      default:
        return <FaUser className="text-2xl text-dark" />;
    }
  };

  // Determine title based on type
  const getTitle = () => {
    switch (type) {
      case "attendee":
        return t("auth.attendeeTitle");
      case "organizer":
        return t("auth.organizerTitle");
      case "admin":
        return t("auth.adminTitle");
      default:
        return "";
    }
  };

  // Determine description based on type
  const getDescription = () => {
    switch (type) {
      case "attendee":
        return t("auth.attendeeDescription");
      case "organizer":
        return t("auth.organizerDescription");
      case "admin":
        return t("auth.adminDescription");
      default:
        return "";
    }
  };

  // Determine illustration based on type
  const getIllustration = () => actor;

  return (
    <div className="min-h-screen w-full bg-[#2B293D] flex flex-col lg:flex-row">
      {/* Left: Illustration - Hidden on mobile */}
      <div className="hidden lg:flex lg:flex-col lg:justify-center lg:items-center lg:w-1/2 lg:min-h-screen bg-[#2B293D] p-6 lg:p-8">
        <div className="w-full max-w-md">
          <span
            dangerouslySetInnerHTML={{
              __html: getIllustration(),
            }}
          ></span>
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
      <div className="flex justify-center items-start w-full lg:w-1/2 min-h-screen bg-white lg:rounded-tl-[80px] lg:rounded-bl-[80px] p-6 sm:p-8 md:p-12 lg:p-16">
        <div className="flex flex-col items-center justify-center gap-6 sm:gap-8 w-full max-w-md lg:max-w-lg">
          <div className="flex w-full items-center justify-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-[#2B293D]/10 flex items-center justify-center">
              {getIcon()}
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-monster text-[#2B293D] font-bold">
                {getTitle()}
              </h1>
              <p className="text-sm text-gray-500 mt-1">{getDescription()}</p>
            </div>
          </div>

          <div className="flex w-full items-center justify-start font-monster">
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
    </div>
  );
};
