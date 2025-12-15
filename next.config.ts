import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      
     
       {
        protocol: "https",
        hostname: "spotly.1177c01fe5730167b0890cc5b12a8f61.r2.cloudflarestorage.com",
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
