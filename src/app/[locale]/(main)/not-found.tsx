import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations("notFound");
  return (
    <div className="flex items-center justify-center h-screen ">{t("simpleMessage")}</div>
  )
}

