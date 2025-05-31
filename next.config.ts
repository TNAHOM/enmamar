import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // course Image
      {
        protocol: "https",
        hostname: "enemamarimageupload.b-cdn.net",
        pathname: "/**", // optional but helps match all image paths
      },
      {
        protocol: "https",
        hostname: "EnemamarImageUpload.b-cdn.net",
        pathname: "/**",
      },

      // Profile-Pictures
      {
        protocol: "https",
        hostname: "enemamarpppull.b-cdn.net",
        pathname: "/**", // optional but helps match all image paths
      },
      {
        protocol: "https",
        hostname: "EnemamarPPpull.b-cdn.net",
        pathname: "/**", // optional but helps match all image paths
      },
    ],
  },
};

export default nextConfig;
