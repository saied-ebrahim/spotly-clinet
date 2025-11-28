interface AuthFormLabelProps {
  children: string;
  htmlFor: string;
}

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
