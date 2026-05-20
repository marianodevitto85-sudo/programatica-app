/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: '/cursos/programatica',
  assetPrefix: '/cursos/programatica',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
