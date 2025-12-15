"use client";

import AuthFormLabel from "./AuthFormLabel";
import AuthFormInput from "./AuthFormInput";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema, LoginSchema } from "@/schemas/loginSchema";
import { useTranslations } from "next-intl";
import { authService } from "@/services/authService";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useState } from "react";
import { encryptData } from "@/shared/encryption";
import { parseJwt } from "@/shared/jwt";

export default function LoginForm() {
  const t = useTranslations("auth.login");
  const tAuth = useTranslations("auth");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: yupResolver(loginSchema(tAuth)),
  });

  const onSubmit = async (data: LoginSchema) => {
    setIsLoading(true);
    try {
      const deviceID = await authService.getDeviceID();
      const response = await authService.login({
        email: data.email,
        password: data.password,
        deviceID,
      });

      // Try to find token in various places
      const token =
        response.token ||
        response.data?.token ||
        response.data?.accessToken ||
        response.accessToken;

      if (token) {
        // const decodedToken = parseJwt(token);
        const encryptedData = encryptData({
          token: token,
          deviceID,
        });

        // Store in a separate cookie that is NOT HttpOnly so client can read it
        Cookies.set("token", encryptedData, {
          path: "/",
          expires: 1,
          secure: false,
          sameSite: "Lax",
        });

        toast.success(t("loginSuccessful"));
        window.location.href = "/";
      } else {
        toast.error(t("loginFailed"));
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(t("loginError"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-5 w-full"
    >
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

      <div className="flex flex-col w-full gap-2">
        <AuthFormLabel htmlFor="password">{t("password")}</AuthFormLabel>
        <AuthFormInput
          {...register("password")}
          placeHolder={t("passwordPlaceholder")}
          type="password"
          className={errors.password ? "border-red-500" : ""}
        />
        {errors.password && (
          <span className="text-red-500 text-sm">
            {errors.password.message}
          </span>
        )}
      </div>

      <div className="flex justify-end -mt-2">
        <Link
          href="/auth/forgot-password"
          className="text-sm text-[#2B293D] hover:text-[#4A4763] font-medium transition-colors duration-150"
        >
          {t("forgotPassword")}
        </Link>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="bg-[#2B293D] w-full py-3.5 text-white text-lg font-bold rounded-lg transition-all duration-200 hover:bg-[#4A4763] hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#2B293D]/50 mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isLoading ? t("signingIn") : t("signIn")}
      </button>
      <div className="flex items-center justify-center gap-2 mt-2">
        <span className="text-base text-gray-600">
          {t("dontHaveAccount")}
        </span>
        <Link
          href="/auth/register"
          className="text-base text-[#2B293D] font-semibold hover:text-[#4A4763] hover:underline transition-colors duration-150"
        >
          {t("signUp")}
        </Link>
      </div>
    </form>
  );
}
