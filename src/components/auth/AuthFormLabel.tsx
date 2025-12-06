import { AuthFormLabelProps } from "@/types/components/forms/AuthFormLabelProps";


export default function AuthFormLabel({
  htmlFor,
  children,
}: AuthFormLabelProps) {
  return (
    <label htmlFor={htmlFor} className="text-sm font-medium text-gray-700">
      {children}
    </label>
  );
}
