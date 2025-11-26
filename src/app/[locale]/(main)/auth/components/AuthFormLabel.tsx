interface AuthFormLabelProps {
  children: string
  htmlFor: string
}

export default function AuthFormLabel({ htmlFor, children }: AuthFormLabelProps) {
  return (
    <label 
      htmlFor={htmlFor} 
      className="text-[20px] font-sans text-[#636363] tracking-wider"
    >
      {children}
    </label>
  )
}
