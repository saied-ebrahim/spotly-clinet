import { register } from "@/svg/register";

export default function AppSummary() {
  return (
    <div className="hidden lg:flex lg:flex-col lg:justify-center lg:items-center lg:w-[40%] lg:min-h-screen bg-[#2B293D] p-6 lg:p-8">
      <div className="w-full max-w-md">
        <span dangerouslySetInnerHTML={{ __html: register }}></span>
      </div>
      <div className="mt-8 text-3xl lg:text-4xl xl:text-5xl text-white flex flex-col font-bold font-monster leading-tight text-center">
          <p>Discover amazing events!</p>
          <p className="mt-4">
            Register to get personalized <br /> event recommendations <br /> and
            manage your bookings <br /> today!
          </p>
        </div>
    </div>
  );
}
