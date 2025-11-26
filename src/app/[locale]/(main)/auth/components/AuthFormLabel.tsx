interface AuthFormLabelProps {
  children: string;
  htmlFor: string;
}

export default function AuthFormLabel({
  htmlFor,
  children,
}: AuthFormLabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className="text-base sm:text-lg lg:text-xl font-sans text-[#636363] tracking-wide font-medium"
    >
      {children}
    </label>
  );
}
