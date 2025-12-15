import { useTranslations } from "next-intl";

export default function AdminMarketingPage() {
  const t = useTranslations("dashboardAdmin.marketing");

  return (
    <div className="flex h-full items-center justify-center">
      <h1 className="text-2xl font-bold text-slate-800">{t("title")}</h1>
    </div>
  );
}
