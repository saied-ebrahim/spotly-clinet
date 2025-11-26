"use client"

import AuthFormLabel from "./AuthFormLabel"
import AuthFormInput from "./AuthFormInput"
import Link from "next/link"

interface LoginFormProps {
  onSubmit?: (data: { email: string; password: string }) => void
  isLoading?: boolean
}

export default function LoginForm({ onSubmit, isLoading = false }: LoginFormProps) {
  
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    
    if (onSubmit) {
      const formData = new FormData(e.currentTarget)
      const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
      }
      onSubmit(data)
    }
  }

  return (
    <form 
      onSubmit={handleSubmit} 
      method="POST" 
      className="flex flex-col gap-6 justify-start w-full items-start"
    >
      
      <div className="flex flex-col w-full gap-2">
        <AuthFormLabel htmlFor="email">E-mail Address</AuthFormLabel>
        <AuthFormInput name="email" placeHolder="Enter Your E-Mail" type="email" />
      </div>

      <div className="flex flex-col w-full gap-2">
        <AuthFormLabel htmlFor="password">Password</AuthFormLabel>
        <AuthFormInput name="password" placeHolder="Password" type="password" />
      </div>

      <div className="flex justify-center items-center w-full">
        <button 
          disabled={isLoading} 
          className="bg-[#2B293D] w-full py-2 text-white text-[24px] font-opensans font-bold rounded-md hover:bg-[#4A4763] duration-75 disabled:bg-[#2B293D]/80"
        >
          {isLoading ? 'Logging In...' : 'Login'}
        </button>
      </div>

      <div className="flex justify-start items-center w-full">
        <p className="text-[20px] text-[#636363] font-opensans mr-3">
          Do not have an account?
        </p>
        <Link 
          href={'../register'} 
          className="text-[20px] text-[#636363] font-opensans font-semibold hover:underline hover:cursor-pointer"
        >
          Sign Up!
        </Link>
      </div>

    </form>
  )
}
