import AppSummary from "../components/AppSummary";
import LoginSection from "../components/LoginSection";

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full bg-[#2B293D] flex flex-col lg:flex-row">
      <AppSummary />
      <LoginSection />
    </div>
  );
}
