"use client";

import { useState } from "react";
import { FaLock, FaEye, FaEyeSlash, FaSave, FaShieldAlt } from "react-icons/fa";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  changePasswordSchema,
  ChangePasswordSchema,
} from "@/schemas/changePasswordSchema";
import { authService } from "@/services/authService";
import { toast } from "react-toastify";

export default function ChangePassword() {
  const t = useTranslations();
  // We'll rename the translation namespace to match usage or just use generic t
  // If "profile" namespace was strictly required, we'd do t = useTranslations("profile");
  // modifying schema to accept a function if needed.
  // Assuming keys are accessible via t("profile.key") or t("auth.key") based on schema.
  // Let's use generic t and pass it to schema.

  const [isLoading, setIsLoading] = useState(false);
  const [passwordNotSet, setPasswordNotSet] = useState(false); // Assuming password IS set for now, or fetch logic needed

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordSchema>({
    resolver: yupResolver(changePasswordSchema(t)),
  });

  const onSubmit = async (data: ChangePasswordSchema) => {
    setIsLoading(true);
    try {
      await authService.changePassword({
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      });
      toast.success(
        t("profile.passwordChangedSuccess") || "Password changed successfully"
      );
      reset();

      // Logout user
      const deviceID = await authService.getDeviceID();
      await authService.logout(deviceID);

      // Redirect to login
      window.location.href = "/auth/login";
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error(
          t("profile.passwordChangeError") || "Failed to change password"
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = (field: "current" | "new" | "confirm") => {
    setShowPassword((current) => ({ ...current, [field]: !current[field] }));
  };

  if (passwordNotSet) {
    return (
      <div className="space-y-8 max-w-2xl">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {t("profile.setPassword")}
          </h1>
          <p className="text-sm text-gray-600">
            {t("profile.createSecurePassword")}
          </p>
        </div>

        {/* Alert */}
        <div className="bg-linear-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <FaShieldAlt className="w-6 h-6 text-amber-600 shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-amber-900 mb-1">
                {t("profile.noPasswordSet")}
              </h3>
              <p className="text-sm text-amber-800">
                {t("profile.noPasswordSetMessage")}
              </p>
            </div>
          </div>
        </div>

        {/* Set Password Button */}
        <div className="flex justify-center sm:justify-start">
          <button
            type="button"
            onClick={() => setPasswordNotSet(false)}
            className="group relative px-8 py-3 bg-brand-primary text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              <FaLock className="w-5 h-5" />
              {t("profile.setPassword")}
            </span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-2xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {t("profile.changePassword")}
        </h1>
        <p className="text-sm text-gray-600">
          {t("profile.updatePasswordMessage")}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Hidden username for accessibility */}
        <input
          type="text"
          name="username"
          autoComplete="username"
          className="hidden"
          readOnly
        />

        {/* Current Password */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            {t("profile.currentPassword")}
          </label>
          <div className="relative">
            <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type={showPassword.current ? "text" : "password"}
              placeholder={t("profile.enterCurrentPassword")}
              autoComplete="current-password"
              {...register("oldPassword")}
              className={`w-full pl-12 pr-12 py-3 rounded-xl border ${
                errors.oldPassword ? "border-red-500" : "border-gray-300"
              } focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all duration-300 bg-white/50 backdrop-blur-sm hover:bg-white`}
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility("current")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showPassword.current ? (
                <FaEyeSlash className="w-5 h-5" />
              ) : (
                <FaEye className="w-5 h-5" />
              )}
            </button>
          </div>
          {errors.oldPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.oldPassword.message}
            </p>
          )}
        </div>

        {/* New Password */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            {t("profile.newPassword")}
          </label>
          <div className="relative">
            <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type={showPassword.new ? "text" : "password"}
              placeholder={t("profile.enterNewPassword")}
              autoComplete="new-password"
              {...register("newPassword")}
              className={`w-full pl-12 pr-12 py-3 rounded-xl border ${
                errors.newPassword ? "border-red-500" : "border-gray-300"
              } focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all duration-300 bg-white/50 backdrop-blur-sm hover:bg-white`}
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility("new")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showPassword.new ? (
                <FaEyeSlash className="w-5 h-5" />
              ) : (
                <FaEye className="w-5 h-5" />
              )}
            </button>
          </div>
          {errors.newPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.newPassword.message}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            {t("profile.confirmNewPassword")}
          </label>
          <div className="relative">
            <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type={showPassword.confirm ? "text" : "password"}
              placeholder={t("profile.confirmNewPasswordPlaceholder")}
              autoComplete="new-password"
              {...register("confirmPassword")}
              className={`w-full pl-12 pr-12 py-3 rounded-xl border ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              } focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all duration-300 bg-white/50 backdrop-blur-sm hover:bg-white`}
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility("confirm")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showPassword.confirm ? (
                <FaEyeSlash className="w-5 h-5" />
              ) : (
                <FaEye className="w-5 h-5" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Password Requirements */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
          <h4 className="text-sm font-semibold text-slate-900 mb-2">
            {t("profile.passwordRequirements")}
          </h4>
          <ul className="text-sm text-slate-700 space-y-1">
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
              {t("profile.passwordMinLength")}
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
              {t("profile.passwordUpperLower")}
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
              {t("profile.passwordNumber")}
            </li>
            <li>Note: You Will Be Logged Out After Changing Your Password</li>
          </ul>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center sm:justify-start pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="group relative px-8 py-3 bg-brand-primary text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <span className="relative z-10 flex items-center gap-2">
              <FaSave className="w-5 h-5" />
              {isLoading
                ? t("profile.saving") || "Saving..."
                : t("profile.updatePassword")}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}
