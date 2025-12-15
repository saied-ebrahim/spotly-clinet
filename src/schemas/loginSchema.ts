import { useTranslations } from "next-intl";
import * as yup from "yup";

export const loginSchema = (t: ReturnType<typeof useTranslations<"auth">>) =>
  yup.object().shape({
    email: yup
      .string()
      .required(t("emailRequired"))
      .email(t("emailInvalid")),
    password: yup
      .string()
      .required(t("passwordRequired"))
      .min(8, t("passwordMinLength"))
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, t("passwordInvalid")),
  });

export type LoginSchema = yup.InferType<ReturnType<typeof loginSchema>>;
