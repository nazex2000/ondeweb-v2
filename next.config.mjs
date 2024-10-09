/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns :[
            {
                protocol: 'https',
                hostname: 'assets.milestoneinternet.com',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: 'firebasestorage.googleapis.com',
                pathname: '**',
            }
        ]
    },
    swcMinify: true,
    productionBrowserSourceMaps: true,
    optimizeFonts: true,
};

export default nextConfig;
