import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import { useLocale } from "next-intl";

interface StepNavigationProps {
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
  isNextDisabled?: boolean;
  nextLabel?: string;
  backLabel?: string;
}

export default function StepNavigation({
  currentStep,
  totalSteps,
  onBack,
  isNextDisabled = false,
  nextLabel = "Next",
  backLabel = "Back",
}: StepNavigationProps) {
  const locale = useLocale();
  return (
    <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
      <button
        type="button"
        onClick={onBack}
        className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${"bg-white text-gray-700 hover:bg-gray-50 border border-gray-200/60"}`}
      >
        <FaArrowLeft className={`${locale === "ar" ? "rotate-180" : ""}`} />

        {backLabel}
      </button>

      <div className="flex items-center gap-2">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div
            key={index}
            className={`h-3 w-3 rounded-full ${
              currentStep === index + 1 ? "bg-[#2B293D]" : "bg-[#2B293D]/40"
            }`}
          ></div>
        ))}
      </div>

      <button
        type="submit"
        disabled={isNextDisabled}
        className="bg-[#2B293D] px-6 py-3 text-white font-bold rounded-lg transition-all duration-200 hover:bg-[#4A4763] hover:scale-[1.02] active:scale-[0.98] disabled:bg-[#2B293D]/60 disabled:cursor-not-allowed flex items-center gap-2"
      >
        {nextLabel}
        <FaArrowRight className={`${locale === "ar" ? "rotate-180" : ""}`} />
      </button>
    </div>
  );
}
