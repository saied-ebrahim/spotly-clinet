import { useState, useEffect } from "react";

const useGeolocation = () => {
  const [location, setLocation] = useState({
    city: null,
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Check if the browser supports geolocation
    if (!("geolocation" in navigator)) {
      setError("Geolocation is not supported by your browser");
      setLoading(false);
      return;
    }

    const handleSuccess = async (position) => {
      const { latitude, longitude } = position.coords;

      try {
        // 2. We have coords, now let's get the city name (Reverse Geocoding)
        // Using OpenStreetMap's free Nominatim API
        const response = await fetch(
          //   `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
        );
        // console.log(response);
        const data = await response.json();
        // console.log(data);
        // Extract city/town/village from the address object
        const city = data.city || "Unknown location";

        setLocation({
          city,
        });
        setLoading(false);
      } catch (err) {
        // If the API fails, we still have the coordinates
        setLocation((prev) => ({ ...prev, latitude, longitude }));
        setError("Found coordinates, but could not determine city name.");
        setLoading(false);
      }
    };

    const handleError = (error) => {
      setLoading(false);
      switch (error.code) {
        case error.PERMISSION_DENIED:
          setError("User denied the request for Geolocation.");
          break;
        case error.POSITION_UNAVAILABLE:
          setError("Location information is unavailable.");
          break;
        case error.TIMEOUT:
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
