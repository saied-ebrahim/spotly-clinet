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
      className="
        w-full p-4 
        text-base sm:text-lg
        border-2 border-[#636363] 
        rounded-md 
        outline-none
        transition-all duration-200 ease-in-out
        focus:border-[#2B293D] 
        focus:ring-2 
        focus:ring-[#2B293D]/20
        focus:scale-[1.01]
        hover:border-[#2B293D]/60
        placeholder:text-[#636363]/60
      "
      type={type}
      placeholder={placeHolder}
      name={name}
      required
    />
  );
}
