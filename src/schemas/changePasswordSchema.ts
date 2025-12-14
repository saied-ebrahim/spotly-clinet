import * as yup from "yup";

export const changePasswordSchema = (t: (arg: string) => string) => {
  return yup.object().shape({
    oldPassword: yup
      .string()
      .required(t("auth.passwordRequired") || "Password is required"),
    newPassword: yup
      .string()
      .required(t("auth.passwordRequired") || "New password is required")
      .min(
        8,
        t("profile.passwordMinLength") ||
          "Password must be at least 8 characters"
      )
      .matches(
        /[A-Z]/,
        t("profile.passwordUpperLower") ||
          "Password must contain at least one uppercase letter"
      )
      .matches(
        /[a-z]/,
        t("profile.passwordUpperLower") ||
          "Password must contain at least one lowercase letter"
      )
      .matches(
        /[0-9]/,
        t("profile.passwordNumber") ||
          "Password must contain at least one number"
      ),
    confirmPassword: yup
      .string()
      .oneOf(
        [yup.ref("newPassword")],
        t("profile.passwordsDoNotMatch") || "Passwords must match"
      )
      .required(
        t("auth.confirmPasswordRequired") || "Confirm password is required"
      ),
  });
};

export type ChangePasswordSchema = yup.InferType<
  ReturnType<typeof changePasswordSchema>
>;
