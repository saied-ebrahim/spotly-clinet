import LoginForm from "./LoginForm";

export default function LoginSection() {
  return (
    <div className="flex justify-center items-start w-full lg:w-[60%] min-h-screen bg-white lg:rounded-tl-[80px] lg:rounded-bl-[80px] p-6 sm:p-8 md:p-12 lg:p-16">
      <div className="flex flex-col items-center justify-center gap-6 sm:gap-8 w-full max-w-md lg:max-w-lg">
        <div className="flex w-full items-center justify-start">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-monster text-[#2B293D] font-bold">
            Login
          </h1>
        </div>

        <div className="flex w-full items-center justify-start font-monster">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
