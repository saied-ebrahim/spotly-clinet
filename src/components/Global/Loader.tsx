import SpotlyLogo from "../Layout/SpotlyLogo";

function Loader() {
  return (
    <div className="flex-col gap-4 w-full flex items-center justify-center">
      <div className="w-[80px] h-[80px] border-4 text-primary text-4xl animate-spin border-gray-300 flex items-center justify-center border-t-primary rounded-full">
        <div className="animate-ping scale-[0.3]">
          <SpotlyLogo />
        </div>
      </div>
    </div>
  );
}

export default Loader;
