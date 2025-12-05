export interface StepNavigationProps {
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
  isNextDisabled?: boolean;
  nextLabel?: string;
  backLabel?: string;
}