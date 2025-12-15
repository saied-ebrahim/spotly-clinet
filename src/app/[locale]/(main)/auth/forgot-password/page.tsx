import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import { useTranslations } from "next-intl";

export default function ForgotPasswordPage() {
  const t = useTranslations("auth.forgotPassword");
  
  return (
    <div className="min-h-screen w-full bg-linear-to-br from-[#2B293D] via-[#3a3850] to-[#2B293D] flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Logo/Brand Section */}
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-monster text-white font-bold text-center mb-2">
            {t("title")}
          </h1>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10">
          <h2 className="text-2xl md:text-3xl font-monster text-[#2B293D] font-bold mb-8 text-center">
            {t("resetPassword")}
          </h2>
          <ForgotPasswordForm />
        </div>
      </div>
    </div>
  );
}
