/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["gddfimffkmcpxgaovxwm.supabase.co", "loremflickr.com"],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig
