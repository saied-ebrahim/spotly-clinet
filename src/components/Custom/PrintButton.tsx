"use client";

import { RefObject } from "react";
import { useReactToPrint } from "react-to-print";
import { FaDownload } from "react-icons/fa";
import { IconType } from "react-icons";

interface PrintButtonProps {
  /**
   * Ref to the element that should be printed
   */
  contentRef: RefObject<HTMLElement | null>;
  /**
   * Document title for the print dialog
   */
  documentTitle?: string;
  /**
   * Button text
   */
  label?: string;
  /**
   * Custom icon component (defaults to FaDownload)
   */
  icon?: IconType;
  /**
   * Icon size
   */
  iconSize?: number;
  /**
   * Custom className for the button
   */
  className?: string;
  /**
   * Callback after successful print
   */
  onAfterPrint?: () => void;
  /**
   * Callback before print
   */
  onBeforePrint?: () => void;
  /**
   * Custom button variant styles
   */
  variant?: "default" | "outline" | "ghost";
  /**
   * Show loading state
   */
  disabled?: boolean;
}

export default function PrintButton({
  contentRef,
  documentTitle = "Document",
  label = "Save as PDF",
  icon: Icon = FaDownload,
  iconSize = 16,
  className = "",
  onAfterPrint,
  onBeforePrint,
  variant = "default",
  disabled = false,
}: PrintButtonProps) {
  const handlePrint = useReactToPrint({
    contentRef,
    documentTitle,
    onAfterPrint: () => {
      console.log("Document printed successfully!");
      onAfterPrint?.();
    },
    onBeforePrint: onBeforePrint ? async () => {
      await onBeforePrint();
    } : undefined,
  });

  const variantStyles = {
    default: "bg-stone-900 text-white hover:bg-stone-800",
    outline: "bg-white border border-stone-300 text-stone-900 hover:bg-stone-50",
    ghost: "bg-transparent text-stone-900 hover:bg-stone-100",
  };

  const baseStyles = "flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <button
      onClick={() => handlePrint && handlePrint()}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      <Icon size={iconSize} />
      {label}
    </button>
  );
}

