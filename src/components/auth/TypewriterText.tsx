"use client";

import Typewriter from "typewriter-effect";
import { useTranslations } from "next-intl";

interface TypewriterTextProps {
  namespace?: string;
}

export default function TypewriterText({ namespace = "auth.login" }: TypewriterTextProps) {
  const t = useTranslations(namespace);
  
  return (
    <div className="text-gray-300 text-sm text-center h-6">
      <Typewriter
        options={{
          strings: [t("subtitle")],
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
