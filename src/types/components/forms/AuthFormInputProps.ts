import { InputHTMLAttributes } from "react";

export interface AuthFormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeHolder?: string;
}