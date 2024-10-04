/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['assets.milestoneinternet.com', 'firebasestorage.googleapis.com'],
    },
};

export default nextConfig;
