const { join } = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: [join(__dirname, 'styles')],
  },
  reactStrictMode: true,
}

module.exports = nextConfig