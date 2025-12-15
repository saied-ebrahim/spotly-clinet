"use client";

import { useEffect, useState } from "react";
import Loader from "./Loader";
import { useLoaderStore } from "@/store/useLoaderStore";
import { authService } from "@/services/authService";
import Cookies from "js-cookie";
import { decryptData, encryptData } from "@/shared/encryption";
import { usePathname } from "next/navigation";
import { parseJwt } from "@/shared/jwt";

function HomeApp({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const isApiLoading = useLoaderStore((state) => state.isLoading);

  const pathname = usePathname();

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      await checkAndRefreshToken();
      setLoading(false);
    };

    const checkAndRefreshToken = async () => {
      const cookie = Cookies.get("sub");
      if (!cookie) return;

      let token = "";
      const decrypted = decryptData(cookie) as {
        token?: string;
        deviceID?: string;
        user?: unknown;
      };
      if (decrypted?.token) {
        token = decrypted.token;
      }

      if (!token) return;

      const decodedToken = parseJwt(token);
      if (!decodedToken || !decodedToken.exp) return;

      const currentTime = Date.now() / 1000;
      const timeRemaining = decodedToken.exp - currentTime; // in seconds

      // Refresh if less than 50 minutes remaining (3000 seconds)
      // OR if token is already expired (timeRemaining <= 0)
      if (timeRemaining < 3000) {
        try {
          const deviceID = await authService.getDeviceID();
          const response = await authService.refreshToken(deviceID);

          if (response?.token) {
            const newEncryptedData = encryptData({
              ...decrypted,
              token: response.token,
            });
            Cookies.set("sub", newEncryptedData, { path: "/" });
          }
        } catch (error) {
          console.error("Auto refresh failed", error);
        }
      }
    };

    init();
  }, [pathname]);

  return (
    <>
      {(loading || isApiLoading) && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-white z-111111 flex items-center justify-center">
          <Loader />
        </div>
      )}
      {!loading && children}
    </>
  );
}

export default HomeApp;
