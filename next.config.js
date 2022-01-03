/** @type {import('next').NextConfig} */
const withImages = require('next-images');

module.exports = withImages({
  reactStrictMode: true,
  basePath: process.env.NODE_ENV === 'production' ? '/chess' : undefined,
})
