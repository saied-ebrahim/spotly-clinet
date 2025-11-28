import AppSummary from "@/components/auth/AppSummary";
import LoginSection from "@/components/auth/LoginSection";

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full bg-[#2B293D] flex flex-col lg:flex-row">
      <AppSummary />
      <LoginSection />
    </div>
  );
}
