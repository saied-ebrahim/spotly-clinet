"use client";

import Typewriter from "typewriter-effect";

export default function TypewriterText() {
  return (
    <div className="text-gray-300 text-sm text-center h-6">
      <Typewriter
        options={{
          strings: ["Sign in to continue to your account"],
          autoStart: true,
          loop: true,
          delay: 50,
          deleteSpeed: 30,
          cursor: "|",
        }}
      />
    </div>
  );
}
