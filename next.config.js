/* eslint-disable import/no-extraneous-dependencies */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  eslint: {
    dirs: ['.'],
  },
  poweredByHeader: false,
  trailingSlash: true,
  basePath: '',
  // The starter code load resources from `public` folder with `router.basePath` in React components.
  // So, the source code is "basePath-ready".
  // You can remove `basePath` if you don't need it.
  reactStrictMode: true,
  images: {
    domains: [
      'images.unsplash.com',
      'digitalpress.fra1.cdn.digitaloceanspaces.com',
    ],
    remotePatterns: [
      {
        hostname: 'digitalpress.fra1.cdn.digitaloceanspaces.com',
      },
      {
        hostname: 'images.unsplash.com',
      },
    ],
  },
});
