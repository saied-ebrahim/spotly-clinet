import SpotlyLogo from "@/components/Layout/SpotlyLogo";

export default function AppSummary() {
  return (
    <div className="hidden lg:flex lg:flex-col lg:justify-start lg:items-start lg:w-1/2 lg:min-h-screen bg-[#2B293D] p-6 lg:p-8">
      {/* Logo Section */}
      <div className="flex w-full justify-start items-start mb-5">
        <SpotlyLogo />
      </div>

      {/* Text Section */}
      <div className="flex items-center justify-center w-full flex-1">
        <div className="text-3xl lg:text-4xl xl:text-5xl text-white flex flex-col font-bold font-monster leading-tight">
          <p>
            Discover tailored <br /> events!
          </p>
          <p className="mt-4">
            Register for more personalized <br /> recommendations <br /> today!
          </p>
        </div>
      </div>
    </div>
  );
}
