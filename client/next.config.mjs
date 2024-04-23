/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXTAUTH_URL: process.env.NEXT_AUTH_URL,
    AUTH_URL: process.env.AUTH_URL,
    API_GATEWAY_URL: process.env.API_GATEWAY_URL,
    SOCKET_URL: process.env.SOCKET_URL,
  },
};

export default nextConfig;
