"use client";
import GeoLocationInterface from "@/types/GeplocationInterface";
import { useState, useEffect } from "react";

const useGeolocation = (): {
  location: GeoLocationInterface;
  error: string | null;
  loading: boolean;
} => {
  const [location, setLocation] = useState<GeoLocationInterface>({
    city: null,
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // 1. Check if the browser supports geolocation
    if (!("geolocation" in navigator)) {
      // Schedule state updates to the next tick to avoid synchronous setState in an effect
      setTimeout(() => {
        setError("Geolocation is not supported by your browser");
        setLoading(false);
      }, 0);
      return;
    }

    const handleSuccess = async (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords;

      try {
        const response = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
        );

        const data = await response.json();

        const city = data.city || "Unknown location";

        setLocation({ city, latitude, longitude });
        setLoading(false);
      } catch (err) {
        console.error("Reverse geocode error:", err);
        // If the API fails, we still have the coordinates
        setLocation((prev) => ({ ...prev, latitude, longitude }));
        setError("Found coordinates, but could not determine city name.");
        setLoading(false);
      }
    };

    const handleError = (err: GeolocationPositionError) => {
      setLoading(false);
      // Use numeric codes to avoid relying on instance properties
      switch (err.code) {
        case 1: // PERMISSION_DENIED
          setError("User denied the request for Geolocation.");
          break;
        case 2: // POSITION_UNAVAILABLE
          setError("Location information is unavailable.");
          break;
        case 3: // TIMEOUT
          setError("The request to get user location timed out.");
          break;
        default:
          setError("An unknown error occurred.");
          break;
      }
    };

    // 3. Request the position
    navigator.geolocation.getCurrentPosition(handleSuccess, handleError, {
      enableHighAccuracy: true, // Better accuracy (uses GPS if available)
      timeout: 10000, // Wait max 10 seconds
      maximumAge: 0, // Don't use cached position
    });
  }, []);

  return { location, error, loading };
};

export default useGeolocation;
