"use client";

import { useTranslations } from "next-intl";
import AttendeeRegisterForm from "@/components/forms/AttendeeRegisterForm";
import OrganizerRegisterForm from "@/components/forms/OrganizerRegisterForm";
import { FaBuilding, FaUser } from "react-icons/fa";
import { actor } from "@/svg/actor";
import { redirect } from "next/navigation";
import TypewriterText from "@/components/auth/TypewriterText";
import { use } from "react";

export default function RegisterPage({
  params,
}: {
  params: Promise<{
    type: "attendee" | "organizer";
    locale: string;
  }>;
}) {
  const { type } = use(params);

  return <RegisterFormComponent type={type} />;
}

const RegisterFormComponent = ({
  type,
}: {
  type: "attendee" | "organizer";
}) => {
  const t = useTranslations("auth.register");

  // Handle invalid type
  if (!["attendee", "organizer"].includes(type)) {
    redirect("/auth/register");
  }

  // Determine icon based on type
  const getIcon = () => {
    switch (type) {
      case "attendee":
        return <FaUser className="text-3xl text-white" />;
      case "organizer":
        return <FaBuilding className="text-3xl text-white" />;
      default:
        return <FaUser className="text-3xl text-white" />;
    }
  };

  // Determine title based on type
  const getTitle = () => {
    switch (type) {
      case "attendee":
        return t("attendeeTitle");
      case "organizer":
        return t("organizerTitle");
      default:
        return "";
    }
  };

  // Determine description based on type
  const getDescription = () => {
    switch (type) {
      case "attendee":
        return t("attendeeDescription");
      case "organizer":
        return t("organizerDescription");
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen w-full bg-linear-to-br from-[#2B293D] via-[#3a3850] to-[#2B293D] flex items-center justify-center p-4">
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
          ) : null}
        </div>
      </div>
    </div>
  );
};
