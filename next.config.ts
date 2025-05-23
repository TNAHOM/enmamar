import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "enemamarimageupload.b-cdn.net",
        // Optionally, you can specify pathname: "/**" to match all paths
      },
      {
        protocol: "https",
        hostname: "/**",
        // Optionally, you can specify pathname: "/**" to match all paths
      },
    ],
  },
};

export default nextConfig;
