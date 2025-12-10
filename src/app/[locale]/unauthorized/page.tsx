import Link from "next/link";
import { BiSolidLockAlt } from "react-icons/bi";
import { IoHome } from "react-icons/io5";

export default function Unauthorized() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-app">
      <div className="glass-effect p-8 md:p-12 max-w-lg w-full text-center relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-accent/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col items-center">
          <div className="bg-red-500/10 p-6 rounded-full inline-flex items-center justify-center mb-6 shadow-inner ring-1 ring-red-500/20">
            <BiSolidLockAlt className="text-6xl text-red-500 drop-shadow-sm" />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-linear-to-r from-black to-black mb-2 tracking-tight">
            401
          </h1>

          <h2 className="text-xl md:text-2xl font-semibold bg-linear-to-r">
            Unauthorized Access
          </h2>

          <p className="bg-linear-to-r mb-8 max-w-sm mx-auto leading-relaxed text-base">
            Sorry, you don&apos;t have permission to access this page. Please
            contact support or return home.
          </p>

          <Link
            href="/"
            className="btn-gradient-primary px-8 py-3.5 rounded-xl font-bold text-white shadow-lg hover:shadow-primary/30 transform transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2 mx-auto"
          >
            <IoHome className="w-5 h-5" />
            <span>Go Back Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
