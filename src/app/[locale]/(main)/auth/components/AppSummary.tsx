import SpotlyLogo from "@/components/Layout/SpotlyLogo"

export default function AppSummary() {
  return (
    <div className="flex flex-col justify-start items-start w-1/2 h-screen bg-[#2B293D]">
      
      {/* Logo Section */}
      <div className="flex w-full justify-start items-start p-4">
        <SpotlyLogo />
      </div>

      {/* Text Section */}
      <div className="flex items-center justify-center w-full h-1/2">
        <div className="text-[48px] text-white items-start flex flex-col font-bold font-monster">
          <p>Discover tailored <br /> events.</p>
          <p>
            Sign up for personalized <br /> recommendations <br /> today!
          </p>
        </div>
      </div>
      
    </div>
  )
}
