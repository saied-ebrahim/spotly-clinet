"use client";

import AuthFormLabel from "./AuthFormLabel";
import AuthFormInput from "./AuthFormInput";
import Link from "next/link";

export default function LoginForm() {
  return (
    <form className="flex flex-col gap-5 w-full">
      <div className="flex flex-col w-full gap-2">
        <AuthFormLabel htmlFor="email">Email Address</AuthFormLabel>
        <AuthFormInput
          name="email"
          placeHolder="Enter your email"
          type="email"
        />
      </div>

      <div className="flex flex-col w-full gap-2">
        <AuthFormLabel htmlFor="password">Password</AuthFormLabel>
        <AuthFormInput
          name="password"
          placeHolder="Enter your password"
          type="password"
        />
      </div>

      <div className="flex justify-end -mt-2">
        <Link
          href="/auth/forgot-password"
          className="text-sm text-[#2B293D] hover:text-[#4A4763] font-medium transition-colors duration-150"
        >
          Forgot Password?
        </Link>
      </div>

      <button
        type="submit"
        className="bg-[#2B293D] w-full py-3.5 text-white text-lg font-bold rounded-lg transition-all duration-200 hover:bg-[#4A4763] hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#2B293D]/50 mt-2"
      >
        Sign In
      </button>

      <div className="flex items-center justify-center gap-2 mt-2">
        <span className="text-base text-gray-600">Don't have an account?</span>
        <Link
          href="/auth/register"
          className="text-base text-[#2B293D] font-semibold hover:text-[#4A4763] hover:underline transition-colors duration-150"
        >
          Sign Up
        </Link>
      </div>
    </form>
  );
}
