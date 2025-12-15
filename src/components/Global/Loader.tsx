import icon from "../../../public/icon.svg"
import Image from "next/image";

function Loader() {
  return (
    <div className="flex-col gap-4 w-full flex items-center justify-center">
      <div className="relative w-[80px] h-[80px] flex items-center justify-center">
        <div className="absolute w-full h-full border-4 border-gray-300 border-t-primary rounded-full animate-spin"></div>
        <div className="relative z-10 animate-ping">
          <Image src={icon} alt="logo" width={24} height={24} className="w-[24px] h-[24px]" />
        </div>
      </div>
    </div>
  );
}

export default Loader;
