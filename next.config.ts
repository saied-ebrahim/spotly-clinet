import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      
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
        hostname: "ui-avatars.com",
      },
      {
        protocol: "https",
        hostname: "static.vecteezy.com",
      },
       {
        protocol: "https",
        hostname: "example.com",
      },
      {
        hostname: "pub-c00f3c4174b8458d8db60aeff42f8480.r2.dev",

      },
       {
        hostname: "imageurl",
      },
      
    ],
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
