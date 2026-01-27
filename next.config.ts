import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  headers: async () => {
      return [
          {
              source: '/Pigeon.mp4',
              headers: [
                  {
                      key: 'Cache-Control',
                      value: 'public, max-age=31536000, immutable',
                  },
              ],
          },
      ];
  },
};

export default nextConfig;
