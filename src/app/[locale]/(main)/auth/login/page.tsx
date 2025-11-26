import AppSummary from "../components/AppSummary"
import LoginSection from "../components/LoginSection"

export default function LoginPage() {
  return (
    <div className="flex w-full items-start justify-start bg-[#2B293D]">
      <AppSummary />
      <LoginSection />
    </div>
  )
}
