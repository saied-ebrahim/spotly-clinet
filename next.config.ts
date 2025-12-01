import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dummyjson.com",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
<<<<<<< HEAD
        hostname: "ui-avatars.com",
=======
        hostname: "example.com",
      },
      {
        hostname: "pub-c00f3c4174b8458d8db60aeff42f8480.r2.dev",
>>>>>>> 5b6fb1f6a9aa360ab13ebfc1e06af26c2079bfbe
      },
    ],
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
