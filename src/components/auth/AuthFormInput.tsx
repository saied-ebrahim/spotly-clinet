interface AuthFormInputProps {
  type: string;
  placeHolder: string;
  name: string;
}

export default function AuthFormInput({
  type,
  placeHolder,
  name,
}: AuthFormInputProps) {
  return (
    <input
      className="w-full px-4 py-2.5 text-sm border-2 border-gray-300 rounded-lg outline-none transition-all duration-200 focus:border-[#2B293D] focus:ring-2 focus:ring-[#2B293D]/20 hover:border-[#2B293D]/60 placeholder:text-gray-400"
      type={type}
      placeholder={placeHolder}
      name={name}
      required
    />
  );
}
