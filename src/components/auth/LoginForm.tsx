"use client";

import AuthFormLabel from "./AuthFormLabel";
import AuthFormInput from "./AuthFormInput";
import Link from "next/link";

export default function LoginForm() {
  return (
    <form className="flex flex-col gap-5 sm:gap-6 justify-start w-full items-start">
      <div className="flex flex-col w-full gap-2">
        <AuthFormLabel htmlFor="email">E-mail Address</AuthFormLabel>
        <AuthFormInput
          name="email"
          placeHolder="Enter Your E-Mail"
          type="email"
        />
      </div>

      <div className="flex flex-col w-full gap-2">
        <AuthFormLabel htmlFor="password">Password</AuthFormLabel>
        <AuthFormInput name="password" placeHolder="Password" type="password" />
      </div>

      <div className="flex justify-center items-center w-full mt-2">
        <button
          type="button"
          className="
            bg-[#2B293D] w-full py-3 sm:py-4
            text-white text-lg sm:text-xl lg:text-2xl
            font-opensans font-bold 
            rounded-md 
            transition-all duration-200 ease-in-out
            hover:bg-[#4A4763] 
            hover:scale-[1.02]
            active:scale-[0.98]
            focus:outline-none
            focus:ring-2
          "
        >
          Login
        </button>
      </div>

      <div className="flex flex-col sm:flex-row justify-start items-start sm:items-center w-full gap-2 sm:gap-3">
        <p className="text-base sm:text-lg lg:text-xl text-[#636363] font-opensans">
          Do not have an account?
        </p>
        <Link
          href="/auth/register"
          className="
            text-base sm:text-lg lg:text-xl
            text-[#636363] font-opensans font-semibold 
            hover:text-[#2B293D]
            hover:underline 
            transition-colors duration-150
            focus:outline-none
            focus:underline
          "
        >
          Sign Up!
        </Link>
      </div>
    </form>
  );
}
