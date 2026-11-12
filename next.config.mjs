/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**.supabase.co" }],
  },
  async redirects() {
    return [
      { source: "/work", destination: "/#work", permanent: false },
      { source: "/projects", destination: "/#work", permanent: false },
    ];
  },
};
export default nextConfig;
