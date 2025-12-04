"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// --- Fix: Leaflet Default Icon in Next.js/React ---
// Leaflet's default icon usage relies on webpack requiring images, which breaks in some Next.js setups.
// We manually point to the CDN images to ensure the marker always appears.
const iconUrl =
  "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png";
const iconRetinaUrl =
  "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png";
const shadowUrl =
  "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png";

const customIcon = L.icon({
  iconUrl,
  iconRetinaUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// --- Helper Component: Update View ---
// If the coordinates change prop-side, this moves the map center
function ChangeView({ coords }: { coords: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(coords, 13); // Zoom level 13
  }, [coords, map]);
  return null;
}

interface EventMapProps {
  lat: number;
  lng: number;
}

export default function EventMap({ lat, lng }: EventMapProps) {
  // Default to a fallback if coords are missing (e.g., Cairo)
  const position: [number, number] = [lat || 30.0444, lng || 31.2357];

  return (
    <div className="h-full w-full z-0">
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={false} // UX: Prevents scrolling down the page from getting stuck in the map
        className="h-full w-full rounded-xl"
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={position} icon={customIcon}>
          <Popup>
            Event Location <br />
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 underline"
            >
              Open in Google Maps
            </a>
          </Popup>
        </Marker>

        <ChangeView coords={position} />
      </MapContainer>
    </div>
  );
}
