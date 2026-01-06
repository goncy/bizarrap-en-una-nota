import type {NextConfig} from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  cacheComponents: true,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.bizarrap.com",
      },
    ],
  },
  cacheLife: {
    default: {
      stale: 60 * 60 * 24 * 14,
      revalidate: 60 * 60 * 24 * 30,
      expire: 60 * 60 * 24 * 365,
    },
  },
};

export default nextConfig;
