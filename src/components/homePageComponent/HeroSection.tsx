"use client";

import { useState } from "react";
// import SearchForm from "./HomePage/SearchForm";
import { hero } from "@/svg/hero";

const TABS = ["Book Online", "Book Offline", "Consultation"] as const;

function HeroSection() {
  const [selectedTab, setSelectedTab] =
    useState<(typeof TABS)[number]>("Book Online");

  return (
    <section className="pt-20 pb-16 container">
      <div className="">
        <div className="relative  rounded-md bg-primary/10 pb-[180px] px-6 py-10 lg:px-12 ">
          {/* accent circle */}
          <div className="overflow-hidden absolute top-0 left-0 w-full h-full">
            <span className="absolute -left-8 top-6 hidden h-12 w-12 rounded-full border-4 border-primary md:block" />
            {/* soft gradient */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(255,255,255,0.5),transparent_60%),radial-gradient(circle_at_70%_10%,rgba(255,255,255,0.3),transparent_55%)]" />
          </div>
          <div className="relative grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-8">
              <div className="space-y-5 ">
                <h1 className="text-4xl font-extrabold leading-[1.1] text-text-primary sm:text-5xl lg:text-6xl">
                  DISCOVER NEXT .
                </h1>
                <p className="text-base text-text-primary ">
                  Find the home that matches your dreams. Explore carefully
                  curated listings
                </p>
              </div>
            </div>
            <div className="relative flex items-center justify-center  ">
              <span
                className="h-[500px]"
                dangerouslySetInnerHTML={{ __html: hero }}
              ></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
