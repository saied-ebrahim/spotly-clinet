import LoginForm from "@/components/auth/LoginForm";
import TypewriterText from "@/components/auth/TypewriterText";
import { register } from "@/svg/register";

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#2B293D] via-[#3a3850] to-[#2B293D] flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Logo/Brand Section */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-32 h-32 mb-4">
            <span dangerouslySetInnerHTML={{ __html: register }}></span>
          </div>
          <h1 className="text-3xl md:text-4xl font-monster text-white font-bold text-center mb-2">
            Welcome Back
          </h1>
          <TypewriterText />
        </div>

        {/* Login Form Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10">
          <h2 className="text-2xl md:text-3xl font-monster text-[#2B293D] font-bold mb-8 text-center">
            Login
          </h2>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
