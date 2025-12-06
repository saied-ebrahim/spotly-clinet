"use client";

import { useState, useEffect } from "react";
import axiosInstance from "@/lib/axios";
import { FiX } from "react-icons/fi";
import { TagDocument } from "@/types/tagInterface";
import { isAxiosError } from "axios";

interface CreateTagModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTagCreated: (newTag: TagDocument) => void;
  tag?: TagDocument | null;
}

export function CreateTagModal({
  isOpen,
  onClose,
  onTagCreated,
  tag,
}: CreateTagModalProps) {
  const [tagName, setTagName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setTagName(tag ? tag.name : "");
      setError("");
    }
  }, [isOpen, tag]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tagName.trim()) {
      setError("Tag name is required");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      let response;
      if (tag) {
        // Edit mode
        response = await axiosInstance.patch(`/tags/${tag._id}`, {
          name: tagName,
        });
      } else {
        // Create mode
        response = await axiosInstance.post("/tags", { name: tagName });
      }

      if (response.data && response.data.status === "success") {
        const resultTag = response.data.data?.tag || response.data.data;
        onTagCreated(resultTag);
        onClose();
        setTagName("");
      }
    } catch (err: unknown) {
      console.error("Failed to save tag:", err);
      if (isAxiosError(err)) {
        setError(
          err.response?.data?.message ||
            `Failed to ${tag ? "update" : "create"} tag. Please try again.`
        );
      } else {
        setError(
          `Failed to ${tag ? "update" : "create"} tag. Please try again.`
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl transform transition-all">
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h3 className="text-xl font-bold text-slate-800">
            {tag ? "Edit Tag" : "Create New Tag"}
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <FiX size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Tag Name
            </label>
            <input
              type="text"
              value={tagName}
              onChange={(e) => setTagName(e.target.value)}
              placeholder="Enter tag name"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
              autoFocus
            />
            {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-4 py-2 text-sm font-medium text-white bg-brand-primary hover:bg-brand-primary/90 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading
                ? tag
                  ? "Updating..."
                  : "Creating..."
                : tag
                ? "Update Tag"
                : "Create Tag"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
