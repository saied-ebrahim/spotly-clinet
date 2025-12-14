"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { IoArrowBack, IoHome, IoWarningOutline } from "react-icons/io5";

export default function NotFoundCatchAll() {
  const router = useRouter();

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white relative overflow-hidden font-sans selection:bg-emerald-500/30">
      {/* Background Ambience */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-100/60 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-100/60 rounded-full blur-[120px] pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-3xl px-6">
        <div className="bg-white/60 backdrop-blur-xl border border-gray-200 rounded-3xl p-8 md:p-14 shadow-2xl text-center relative overflow-hidden group">
          {/* Shine Effect */}
          <div className="absolute inset-0 bg-linear-to-r from-white/40 via-white/0 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

          {/* Icon/Graphic */}
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-linear-to-br from-emerald-50 to-cyan-50 border border-emerald-100 mb-8 animate-bounce-slow">
            <IoWarningOutline className="w-12 h-12 text-emerald-500" />
          </div>

          {/* Typography */}
          <h1 className="text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-linear-to-r from-emerald-500 via-teal-500 to-cyan-500 mb-4 tracking-tighter">
            404
          </h1>

          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
            Page Not Found
          </h2>

          <p className="text-lg text-gray-600 mb-10 max-w-lg mx-auto leading-relaxed">
            Sorry, we couldn&apos;t find the page you&apos;re looking for. It
            might have been moved, deleted, or never existed.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => router.back()}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium border border-gray-200 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 group/btn"
            >
              <IoArrowBack className="group-hover/btn:-translate-x-1 transition-transform" />
              Go Back
            </button>

            <Link
              href="/"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold shadow-lg shadow-emerald-200/50 transition-all duration-300 hover:scale-105 hover:shadow-emerald-300/50 flex items-center justify-center gap-2"
            >
              <IoHome />
              Back to Home
            </Link>
          </div>

          {/* Footer Decoration */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-emerald-500/30 to-transparent opacity-50" />
        </div>

        {/* Support Link */}
        <div className="mt-8 text-center">
          <Link
            href="/contact"
            className="text-gray-500 hover:text-emerald-600 text-sm font-medium transition-colors duration-200"
          >
            Need help? Contact Support &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
