import type { NextConfig } from "next";

// images.remotePatterns i need to use this.
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.vecteezy.com",
      },
    ],
  },
  /* config options here */
};

export default nextConfig;
