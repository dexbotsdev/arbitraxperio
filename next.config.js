/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
        {
            source: '/api/:slug*',
            destination: 'http://localhost:5000/:slug*'
        },
    ]
},
}

module.exports = nextConfig
