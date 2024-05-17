/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  images: {
    domains: [
      "m.media-amazon.com",
      "lh3.googleusercontent.com",
      "firebase.google.com",
      "console.firebase.google.com",
      "images.remotePatterns",
      "firebasestorage.googleapis.com",
    ],
  },
  reactStrictMode: false,
};

module.exports = nextConfig;
