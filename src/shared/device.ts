import FingerprintJS from "@fingerprintjs/fingerprintjs";

export const getDeviceID = async (): Promise<string> => {
  if (typeof window === "undefined") return "server-side-device-id";
  let deviceID = localStorage.getItem("deviceID");
  if (!deviceID) {
    try {
      const fp = await FingerprintJS.load();
      const { visitorId } = await fp.get();
      deviceID = visitorId;
    } catch (error) {
      console.error("FingerprintJS error:", error);
      deviceID = `dev-${Math.random().toString(36).substr(2, 9)}`;
    }
    localStorage.setItem("deviceID", deviceID);
  }
  return deviceID;
};
