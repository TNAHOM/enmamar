import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "enemamarimageupload.b-cdn.net",
        pathname: "/**", // optional but helps match all image paths
      },
      {
        protocol: "https",
        hostname: "enemamarpppull.b-cdn.net",
        pathname: "/**", // optional but helps match all image paths
      },
      {
        protocol: "https",
        hostname: "EnemamarImageUpload.b-cdn.net",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
