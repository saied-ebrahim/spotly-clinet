"use client";

import AuthFormLabel from "./AuthFormLabel";
import AuthFormInput from "./AuthFormInput";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslations } from "next-intl";
import { authService } from "@/services/authService";
import { toast } from "react-toastify";
import { useState } from "react";
import {
  forgotPasswordSchema,
  ForgotPasswordSchema,
} from "@/schemas/forgotPasswordSchema";

export default function ForgotPasswordForm() {
  const t = useTranslations("auth.forgotPassword");
  const tCommon = useTranslations("common");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordSchema>({
    resolver: yupResolver(forgotPasswordSchema(t)),
  });

  const onSubmit = async (data: ForgotPasswordSchema) => {
    setIsLoading(true);
    try {
      await authService.forgotPassword(data.email);
      toast.success(t("success"));
      setIsSuccess(true);
    } catch (error: unknown) {
      console.error("Forgot password error:", error);
      let message = t("error");

      if (error instanceof Error) {
        const errorMsg = error.message.toLowerCase();
        if (
          errorMsg.includes("user not found") ||
          errorMsg.includes("no user") ||
          errorMsg.includes("does not exist")
        ) {
          message = t("emailNotFound");
        } else {
          message = error.message;
        }
      }
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center text-center gap-6">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {t("emailSent")}
          </h3>
          <p className="text-gray-600">
            {t("checkEmail")}
          </p>
        </div>
        <Link
          href="/auth/login"
          className="text-[#2B293D] font-semibold hover:text-[#4A4763] hover:underline transition-colors duration-150"
        >
          {t("backToLogin")}
        </Link>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-5 w-full"
    >
      <div className="text-center mb-4">
        <p className="text-gray-600">
          {t("instructions")}
        </p>
      </div>

      <div className="flex flex-col w-full gap-2">
        <AuthFormLabel htmlFor="email">{t("emailAddress")}</AuthFormLabel>
        <AuthFormInput
          {...register("email")}
          placeHolder={t("emailPlaceholder")}
          type="email"
          className={errors.email ? "border-red-500" : ""}
        />
        {errors.email && (
          <span className="text-red-500 text-sm">{errors.email.message}</span>
        )}
      </div>

      <div className="flex justify-end -mt-2">
        <Link
          href="/auth/login"
          className="text-sm text-[#2B293D] hover:text-[#4A4763] font-medium transition-colors duration-150"
        >
          {t("backToLogin")}
        </Link>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="bg-[#2B293D] w-full py-3.5 text-white text-lg font-bold rounded-lg transition-all duration-200 hover:bg-[#4A4763] hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#2B293D]/50 mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isLoading ? t("sending") : t("sendResetLink")}
      </button>
    </form>
  );
}
