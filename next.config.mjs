/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: '/cursos/programatica',
  assetPrefix: '/cursos/programatica',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Allow embedding in marianodevitto.com iframe.
          // CSP frame-ancestors overrides X-Frame-Options in all modern browsers.
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'self' https://marianodevitto.com https://marianodevittomkt.netlify.app",
          },
          {
            key: 'X-Frame-Options',
            value: 'ALLOWALL',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
