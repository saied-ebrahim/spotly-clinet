export const getDeviceID = (): string => {
  if (typeof window === "undefined") return "server-side-device-id";
  let deviceID = localStorage.getItem("deviceID");
  if (!deviceID) {
    deviceID = `dev-${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem("deviceID", deviceID);
  }
  return deviceID;
};
