import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'bioorganicpestcontrol.in',
        pathname: '/wp-content/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/services/crawling-insects-control',
        destination: '/services/cockroach-control',
        permanent: true,
      },
      {
        source: '/crawling-insects-control',
        destination: '/services/cockroach-control',
        permanent: true,
      },
    ]
  },
}

export default nextConfig;
