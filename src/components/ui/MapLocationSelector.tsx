"use client";
import { LatLng, LatLngExpression, Map, Marker } from "leaflet";
import { useState, useEffect, useRef } from "react";

// --- Inline Icon Components (Replacing lucide-react) ---

const IconMapPin = ({ className }: { className: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const IconCheck = ({ className }: { className: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const IconX = ({ className }: { className: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

const IconAlertCircle = ({ className }: { className: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" x2="12" y1="8" y2="12" />
    <line x1="12" x2="12.01" y1="16" y2="16" />
  </svg>
);

const IconLoader = ({ className }: { className: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);

/**
 * COMPONENT: LocationSelector
 * A self-contained map component that loads Leaflet dynamically.
 * Uses raw Leaflet logic inside React hooks.
 */
interface LocationData {
  address: string;
  city: string;
  district: string;
  country: string;
  lat: number;
  lng: number;
}

interface MapLocationSelectorProps {
  onLocationSelect?: (location: LocationData) => void;
  onClose?: () => void; // Optional close handler if needed
}

/**
 * COMPONENT: LocationSelector
 */
export default function LocationSelector({
  onLocationSelect,
  onClose,
}: MapLocationSelectorProps) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<Map | null>(null);
  const markerRef = useRef<Marker | null>(null);
  const confirmedRef = useRef(false);

  const [isLeafletLoaded, setIsLeafletLoaded] = useState(false);
  const [isGeocoderLoaded, setIsGeocoderLoaded] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState<LatLng | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [notification, setNotification] = useState("");
  const [isGeocoding, setIsGeocoding] = useState(false);

  useEffect(() => {
    confirmedRef.current = confirmed;
  }, [confirmed]);

  useEffect(() => {
    const loadLeaflet = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (window.L && (window.L.Control as any).Geocoder) {
        setIsLeafletLoaded(true);
        setIsGeocoderLoaded(true);
        return;
      }

      // Load Leaflet CSS
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      link.integrity = "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=";
      link.crossOrigin = "";
      document.head.appendChild(link);

      // Load Leaflet JS
      const script = document.createElement("script");
      script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
      script.integrity = "sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=";
      script.crossOrigin = "";
      script.onload = () => {
        setIsLeafletLoaded(true);
        loadGeocoder();
      };
      document.head.appendChild(script);
    };

    const loadGeocoder = () => {
      // Load Geocoder CSS
      const geoLink = document.createElement("link");
      geoLink.rel = "stylesheet";
      geoLink.href =
        "https://unpkg.com/leaflet-control-geocoder/dist/Control.Geocoder.css";
      document.head.appendChild(geoLink);

      // Load Geocoder JS
      const geoScript = document.createElement("script");
      geoScript.src =
        "https://unpkg.com/leaflet-control-geocoder/dist/Control.Geocoder.js";
      geoScript.onload = () => setIsGeocoderLoaded(true);
      document.head.appendChild(geoScript);
    };

    loadLeaflet();
  }, []);

  useEffect(() => {
    if (
      !isLeafletLoaded ||
      !isGeocoderLoaded ||
      !mapContainerRef.current ||
      mapInstanceRef.current
    )
      return;

    // Default position: Cairo, Egypt
    const defaultCenter: LatLngExpression = [30.0444, 31.2357];
    const defaultZoom = 13;

    const L = window.L;
    const map = L.map(mapContainerRef.current, { zoomControl: false }).setView(
      defaultCenter,
      defaultZoom
    );
    mapInstanceRef.current = map as Map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Add Geocoder Control
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((L.Control as any).Geocoder) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      new (L.Control as any).Geocoder({
        defaultMarkGeocode: false,
        placeholder: "Search for location...",
        collapsed: false,
      })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .on("markgeocode", function (e: any) {
          const latlng = e.geocode.center;
          setSelectedPosition(latlng);
          map.fitBounds(e.geocode.bbox);
        })
        .addTo(map);
    }

    map.on("click", (e) => {
      if (confirmedRef.current) return;
      setSelectedPosition(e.latlng);
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [isLeafletLoaded, isGeocoderLoaded]);

  useEffect(() => {
    if (!mapInstanceRef.current || !isLeafletLoaded || !selectedPosition)
      return;
    if (confirmed) return;

    const L = window.L;
    const map = mapInstanceRef.current;

    // Custom Icon (reusing existing SVG logic for brevity, or simplifying)
    const customIcon = L.divIcon({
      className: "custom-marker",
      html: `<div style="width: 30px; height: 42px; display: flex; justify-content: center; align-items: center; color: #ef4444; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="40" height="40">
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
      </div>`,
      iconSize: [30, 42],
      iconAnchor: [15, 42],
      popupAnchor: [0, -45],
    });

    if (markerRef.current) {
      markerRef.current.setLatLng(selectedPosition);
    } else {
      markerRef.current = L.marker(selectedPosition, {
        icon: customIcon,
      }).addTo(map);
    }

    const currentZoom = map.getZoom();
    const targetZoom = currentZoom < 12 ? 14 : currentZoom;
    map.flyTo(selectedPosition, targetZoom, { animate: true, duration: 1.5 });
  }, [selectedPosition, isLeafletLoaded, confirmed]);

  const handleConfirm = async () => {
    if (!selectedPosition) return;
    setConfirmed(true);
    setIsGeocoding(true);

    try {
      // Reverse Geocoding with Nominatim
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${selectedPosition.lat}&lon=${selectedPosition.lng}`
      );
      const data = await response.json();

      const address = data.display_name || "";
      const city =
        data.address?.city || data.address?.town || data.address?.village || "";
      const district =
        data.address?.suburb ||
        data.address?.neighbourhood ||
        data.address?.district ||
        ""; // Capture district
      const country = data.address?.country || "";

      const locationData: LocationData = {
        address,
        city,
        district,
        country,
        lat: selectedPosition.lat,
        lng: selectedPosition.lng,
      };

      if (onLocationSelect) {
        onLocationSelect(locationData);
      }
      setNotification("Location confirmed!");
    } catch (error) {
      console.error("Geocoding error:", error);
      setNotification("Location confirmed (Address lookup failed)");
      // Still return coords if geocoding fails
      if (onLocationSelect) {
        onLocationSelect({
          address: "",
          city: "",
          district: "",
          country: "",
          lat: selectedPosition.lat,
          lng: selectedPosition.lng,
        });
      }
    } finally {
      setIsGeocoding(false);
      setTimeout(() => {
        setNotification("");
        if (onClose) onClose(); // Auto close if desired
      }, 1500);
    }
  };

  const handleCancel = () => {
    setSelectedPosition(null);
    setConfirmed(false);
    if (markerRef.current) {
      markerRef.current.remove();
      markerRef.current = null;
    }
  };

  const handleReset = () => {
    setConfirmed(false);
    setNotification("");
  };

  return (
    <div className="flex flex-col w-full h-full bg-gray-50 p-4 font-sans relative">
      <div className="mb-4 z-10 flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <IconMapPin className="text-blue-600 w-8 h-8" /> Select Location
          </h1>
          <p className="text-gray-600 text-sm mt-1">
            Tap on the map to pin your destination.
          </p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="p-2 bg-white rounded-full shadow hover:bg-gray-100"
          >
            <IconX className="w-6 h-6 text-gray-600" />
          </button>
        )}
      </div>

      <div className="relative flex-grow w-full rounded-xl overflow-hidden shadow-lg border border-gray-200 bg-gray-200 min-h-[400px]">
        {!isLeafletLoaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500 z-50 bg-gray-100">
            <IconLoader className="w-10 h-10 animate-spin mb-2 text-blue-500" />
            <span className="text-sm font-medium">Loading Map...</span>
          </div>
        )}

        <div ref={mapContainerRef} className="w-full h-full z-0 outline-none" />

        {selectedPosition && !confirmed && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-[95%] max-w-xs bg-white rounded-xl shadow-2xl p-4 z-[1000] border border-gray-100">
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="flex flex-col items-center gap-2">
                <div className="bg-blue-50 p-2 rounded-full">
                  <IconAlertCircle className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-base leading-tight">
                    Confirm Location?
                  </h3>
                  <div className="text-[10px] text-gray-500 mt-1 font-mono bg-gray-50 px-2 py-0.5 rounded border border-gray-100 inline-block">
                    {selectedPosition.lat.toFixed(5)},{" "}
                    {selectedPosition.lng.toFixed(5)}
                  </div>
                </div>
              </div>
              <div className="flex w-full gap-2 pt-1">
                <button
                  onClick={handleCancel}
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition-colors text-xs"
                >
                  <IconX className="w-3.5 h-3.5" /> Cancel
                </button>
                <button
                  onClick={handleConfirm}
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-md shadow-blue-200 transition-all text-xs active:scale-95"
                >
                  <IconCheck className="w-3.5 h-3.5" /> Confirm
                </button>
              </div>
            </div>
          </div>
        )}

        {isGeocoding && (
          <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-[2000] flex items-center justify-center">
            <div className="bg-white p-4 rounded-xl shadow-xl flex flex-col items-center">
              <IconLoader className="w-8 h-8 animate-spin text-brand-primary mb-2" />
              <span className="text-sm font-medium text-slate-700">
                Fetching Address...
              </span>
            </div>
          </div>
        )}

        {confirmed && !isGeocoding && (
          <div className="absolute top-4 right-4 z-[1000]">
            <div className="bg-white/90 backdrop-blur-sm border border-green-200 text-green-700 px-4 py-3 rounded-lg shadow-lg flex items-center gap-3">
              <div className="bg-green-100 p-1.5 rounded-full">
                <IconCheck className="w-4 h-4 text-green-700" />
              </div>
              <div>
                <span className="block text-sm font-bold text-gray-900">
                  Location Locked
                </span>
                <button
                  onClick={handleReset}
                  className="text-xs text-gray-500 underline hover:text-green-700 mt-0.5"
                >
                  Tap to change
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {notification && (
        <div className="fixed bottom-6 right-6 bg-gray-900 text-white text-sm px-5 py-3 rounded-lg shadow-xl flex items-center gap-3 z-[2000]">
          <IconCheck className="w-4 h-4 text-green-400" />
          {notification}
        </div>
      )}
    </div>
  );
}
