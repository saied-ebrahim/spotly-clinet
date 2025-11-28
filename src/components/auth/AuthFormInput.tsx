import { forwardRef, InputHTMLAttributes } from "react";

interface AuthFormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeHolder?: string;
}

const AuthFormInput = forwardRef<HTMLInputElement, AuthFormInputProps>(
  ({ type, placeHolder, className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`w-full px-4 py-2.5 text-sm border-2 border-gray-300 rounded-lg outline-none transition-all duration-200 focus:border-[#2B293D] focus:ring-2 focus:ring-[#2B293D]/20 hover:border-[#2B293D]/60 placeholder:text-gray-400 ${className}`}
        type={type}
        placeholder={placeHolder}
        {...props}
      />
    );
  }
);

AuthFormInput.displayName = "AuthFormInput";

export default AuthFormInput;
