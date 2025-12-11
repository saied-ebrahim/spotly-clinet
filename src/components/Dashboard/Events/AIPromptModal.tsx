"use client";

import { useState } from "react";
import { FaMagic, FaTimes, FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";
// axios removed
// import axios from "@/lib/axios";
// Actually, for internal Next.js API routes, standard axios or fetch is fine.
// If `lib/axios` has a baseURL that points to the *external* backend, we should use standard fetch or a relative path.
// Let's safe-guard by using a relative path with standard fetch/axios.

import { category as Category, tags as Tag } from "@/types/eventInterface";
import { CreateEventSchema } from "@/schemas/createEventSchema";

interface AIPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerate: (data: Partial<CreateEventSchema>) => void;
  categories: Category[];
  tags: Tag[];
}

export default function AIPromptModal({
  isOpen,
  onClose,
  onGenerate,
  categories,
  tags,
}: AIPromptModalProps) {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    try {
      // We use fetch for the Next.js API route to avoid conflicts with custom axios defaults
      const response = await fetch("/api/ai/generate-event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          categories,
          tags,
        }),
      });

      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.message || "Failed to generate event");
      }

      toast.success("Event details generated successfully! ✨");
      onGenerate(json.data);
      onClose();
    } catch (error: unknown) {
      console.error("AI Generation Error:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to generate event details"
      );
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-100">
        {/* Header */}
        <div className="bg-linear-to-r from-brand-primary/10 to-brand-secondary/10 p-6 flex justify-between items-center border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary">
              <FaMagic size={18} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Magic Auto-Fill
              </h3>
              <p className="text-sm text-slate-500">
                Describe your event and let AI do the rest.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="relative">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., 'I want to host a Yoga Workshop in Maadi next Friday at 10 AM. Price is 200 EGP. It's for beginners.'"
              className="w-full h-40 p-4 rounded-xl border border-slate-200 focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 transition-all resize-none outline-none text-slate-700 placeholder:text-slate-400 leading-relaxed"
            />
          </div>

          <div className="bg-blue-50 text-blue-700 text-sm p-4 rounded-lg flex items-start gap-3">
            <span className="text-lg mt-0.5">💡</span>
            <div className="space-y-1">
              <p className="font-semibold">Pro Tips for Best Results:</p>
              <ul className="list-disc pl-4 space-y-0.5 opacity-90">
                <li>
                  <span className="font-medium">When:</span> Include Date & Time
                </li>
                <li>
                  <span className="font-medium">Where:</span> Specify City &
                  District (or mention &quot;Online&quot;)
                </li>
                <li>
                  <span className="font-medium">Tickets:</span> state Price &
                  Quantity
                </li>
              </ul>
              <p className="text-xs pt-1 opacity-85 italic border-t border-blue-200/50 mt-1">
                Note: You will need to upload the event image manually.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 pt-0 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg text-slate-600 font-medium hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleGenerate}
            disabled={loading || !prompt.trim()}
            className="px-6 py-2.5 rounded-lg bg-brand-primary text-white font-medium hover:bg-brand-primary/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-all shadow-lg shadow-brand-primary/20"
          >
            {loading ? (
              <>
                <FaSpinner className="animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <FaMagic />
                Generate
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
