"use client";

import { useState } from "react";
import { FaCheck, FaCopy } from "react-icons/fa";
import { toast } from "react-toastify";

export default function CopyButton() {
  const [copied, setCopied] = useState(false);
    console.log(copied);
  const handleCopy = async () => {
    try {
      // 1. Get the current URL from the window object
      const url = window.location.href;
      
      // 2. Write the URL to the user's clipboard
      await navigator.clipboard.writeText(url);
      
      // 3. Trigger the visual feedback
      setCopied(true);
      toast.info("Copied to clipboard");
    
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
   <button onClick={handleCopy} className="p-3 rounded-full hover:bg-gray-100 transition-all active:scale-95 border border-gray-200">
            {copied ? <FaCheck className="w-5 h-5 text-gray-600" /> : <FaCopy className="w-5 h-5 text-gray-600" />}
</button>
  );
}