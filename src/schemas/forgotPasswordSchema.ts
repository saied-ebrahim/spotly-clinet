import { useTranslations } from "next-intl";
import * as yup from "yup";

export const forgotPasswordSchema = (
  t: ReturnType<typeof useTranslations<"">>
) =>
  yup.object().shape({
    email: yup
      .string()
      .required(t("auth.emailRequired"))
      .email(t("auth.emailInvalid")),
  });

export type ForgotPasswordSchema = yup.InferType<
  ReturnType<typeof forgotPasswordSchema>
>;
