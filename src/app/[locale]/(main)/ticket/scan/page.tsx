"use client";

import React, { useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader, NotFoundException } from "@zxing/library";
import {
  FaQrcode,
  FaCheckCircle,
  FaTimesCircle,
  FaCamera,
  FaArrowLeft,
} from "react-icons/fa";
import Link from "next/link";
import axiosInstance from "@/lib/axios";
import { toast } from "react-toastify";
import { Ticket, TicketResponse } from "@/types/Tickets/ticketResponseInterfaces";

export default function TicketScanPage() {
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(true);
  const [validationStatus, setValidationStatus] = useState<
    "idle" | "validating" | "valid" | "invalid" | "used"
  >("idle");
  const [error, setError] = useState<string | null>(null);
  const [tickerData, setTickerData] = useState<TicketResponse>({} as TicketResponse);

  const videoRef = useRef<HTMLVideoElement>(null);
  const codeReaderRef = useRef<BrowserMultiFormatReader | null>(null);

  // 1. Initialize the Scanner
  const validateTicket = async (code: string) => {
    try {
      setValidationStatus("validating");

      // TODO: REPLACE THIS WITH YOUR REAL API CALL
      // Example: const res = await fetch('/api/validate', { body: JSON.stringify({ code }) })

      const res = await axiosInstance.get(`/tickets/verify/${code}`);
      console.log(res);
      setTickerData(res.data.data);
      if (res.data?.success === false || res.data?.statusCode === 401) {
        setValidationStatus("invalid");
        toast.error(res.data.message);
      } else if (res.data.alreadyUsed === true) {
        setValidationStatus("used");
        toast.error(res.data.message);
      } else if (res.data.alreadyUsed === false) {
        setValidationStatus("valid");
        toast.success(res.data.message);
      }
    } catch (error: unknown) {
      console.log(error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred");
      }
    }
  };
  function handleScan(code: string) {
    // Stop the camera immediately
    setIsScanning(false);
    if (codeReaderRef.current) {
      codeReaderRef.current.reset();
    }
    console.log(code);

    setScanResult(code);
    validateTicket(code);
  }
  useEffect(() => {
    if (!isScanning) return;

    codeReaderRef.current = new BrowserMultiFormatReader();

    // Select back camera (environment) by default
    codeReaderRef.current
      .decodeFromConstraints(
        { video: { facingMode: "environment" } },
        videoRef.current!,
        (result, err) => {
          if (result) {
            // QR Code found
            handleScan(result.getText());
          }
          if (err && !(err instanceof NotFoundException)) {
            // Real errors (permission denied, etc), ignoring "No QR found" errors
            console.error(err);
          }
        }
      )
      .catch((err) => {
        console.error(err);
        setError(
          "Could not access camera. Please ensure permissions are granted."
        );
      });

    // Cleanup: Stop camera when component unmounts or scanning stops
    return () => {
      if (codeReaderRef.current) {
        codeReaderRef.current.reset();
      }
    };
  }, [isScanning]);

  // 2. Handle the detected QR Code

  // 3. Mock Backend Validation

  // 4. Reset to scan again
  const handleReset = () => {
    setScanResult(null);
    setValidationStatus("idle");
    setError(null);
    setIsScanning(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
      {/* Header */}
      <div className="w-full max-w-md flex items-center justify-between mb-8">
        <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
          <FaArrowLeft size={20} />
        </Link>
        <h1 className="text-xl font-bold text-gray-800">Scan Ticket</h1>
        <div className="w-5"></div> {/* Spacer for centering */}
      </div>

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden relative min-h-[400px] flex flex-col">
        {/* State: Camera Error */}
        {error && (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <div className="bg-red-100 p-4 rounded-full mb-4">
              <FaCamera className="text-red-500 text-3xl" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Camera Error
            </h3>
            <p className="text-gray-500 mb-6">{error}</p>
            <button
              onClick={handleReset}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium"
            >
              Try Again
            </button>
          </div>
        )}

        {/* State: Scanning Active */}
        {!error && isScanning && (
          <div className="relative flex-1 bg-black flex flex-col items-center justify-center">
            {/* The Video Element */}
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Visual Overlay (The scanning box) */}
            <div className="relative z-10 w-64 h-64 border-4 border-white/50 rounded-lg flex items-center justify-center">
              <div className="absolute inset-0 border-4 border-blue-500 rounded-lg animate-pulse opacity-50"></div>
              <p className="mt-80 text-white font-medium drop-shadow-md">
                Point at QR Code
              </p>
            </div>

            {/* Scan Line Animation */}
            <div className="absolute left-1/2 -translate-x-1/2 w-64 h-0.5 bg-red-500 shadow-[0_0_10px_red] animate-scan"></div>
          </div>
        )}

        {/* State: Validating / Result */}
        {!isScanning && !error && scanResult && (
          <div className="flex-1 flex flex-col items-center justify-center p-8 animate-in fade-in zoom-in duration-300">
            {validationStatus === "invalid" && (
              <div className="flex flex-col items-center text-center">
                <FaTimesCircle className="text-red-500 text-6xl mb-4" />
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Invalid Ticket
                </h2>
                <p className="text-gray-500 mb-6">
                  This ticket code is not recognized.
                </p>
                <button
                  onClick={handleReset}
                  className="w-full py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-black transition-colors flex items-center justify-center gap-2"
                >
                  <FaQrcode /> Scan Again
                </button>
              </div>
            )}
            {validationStatus === "validating" && (
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
                <p className="text-gray-500 font-medium">Verifying ticket...</p>
                <p className="text-xs text-gray-400 mt-2 font-mono break-all max-w-[200px] text-center">
                  {scanResult}
                </p>
              </div>
            )}

            {validationStatus === "valid" && (
              <div className="flex flex-col items-center text-center">
                <FaCheckCircle className="text-green-500 text-6xl mb-4" />
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Access Granted
                </h2>
                <p className="text-gray-500 mb-6">This ticket is valid.</p>

                <div className="bg-gray-100 p-4 rounded-lg w-full mb-6">
                  <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">
                    Ticket ID
                  </p>
                  <p className="font-mono text-gray-700 break-all">
                    {scanResult}
                  </p>
                </div>

                <button
                  onClick={handleReset}
                  className="w-full py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-black transition-colors flex items-center justify-center gap-2"
                >
                  <FaQrcode /> Scan Next
                </button>
              </div>
            )}

            {validationStatus === "used" && (
              <div className="flex flex-col items-center text-center">
                <FaTimesCircle className="text-red-500 text-6xl mb-4" />
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Used Ticket
                </h2>
                <p className="text-gray-500 mb-6">
                  This ticket has already been used.
                </p>

                <div className="bg-red-50 p-4 rounded-lg w-full mb-6 border border-red-100">
                  <p className="text-xs text-red-400 uppercase font-bold tracking-wider mb-1">
                    Scanned Code
                  </p>
                  <p className="font-mono text-red-700 break-all">
                    {tickerData.ticket.event.title}
                  </p>
                </div>

                <button
                  onClick={handleReset}
                  className="w-full py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-black transition-colors flex items-center justify-center gap-2"
                >
                  <FaQrcode /> Scan Again
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <p className="mt-8 text-xs text-gray-400 text-center max-w-xs">
        Ensure you are in a well-lit area. <br /> Works best with high contrast
        QR codes.
      </p>
    </div>
  );
}
