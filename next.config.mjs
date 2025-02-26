/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/dashboard",
        destination: "/dashboard/alternate",
        permanent: false,
      },
      {
        source: "/",
        destination: "/dashboard/alternate",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
