/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');
const { i18n } = require('./next-i18next.config');
const nextConfig = {
  
  reactStrictMode: true,
  i18n,
  pwa: {
    disable: process.env.NODE_ENV === 'development',
    dest: 'public',
    runtimeCaching,
  },
  images: {
    domains: [
      'pickbazarlaravel.s3.ap-southeast-1.amazonaws.com',
      'lh3.googleusercontent.com',
      'localhost',
      'localhost:3002',
      '127.0.0.1',
      'i.pravatar.cc',
      '172.16.12.30',
      '172.16.10.101',
      'acebook-api-demo.acemcbohol.ph',
      'acebook-flsrv-demo.acemcbohol.ph',
      'acebook-flsrv-beta.acemcbohol.ph',
      'acebook-demo.acemcbohol.ph',
      'acebook-beta.acemcbohol.ph',
      'asm-demo.acemcbohol.ph',
    ],
  },
  ...(process.env.FRAMEWORK_PROVIDER === 'graphql' && {
    webpack(config, options) {
      config.module.rules.push({
        test: /\.graphql$/,
        exclude: /node_modules/,
        use: [options.defaultLoaders.babel, { loader: 'graphql-let/loader' }],
      });

      config.module.rules.push({
        test: /\.ya?ml$/,
        type: 'json',
        use: 'yaml-loader',
      });

      config.module.rules.push({
        test: /\.mp3$/,
        // test: /\.wav$/,
        use:  { loader: 'file-loader' },
        // use: 'file-loader',
      });

      return config;
    },
  }),
  ...(process.env.NODE_ENV === 'production' && {
    compiler: {
      removeConsole: true,
    },
    typescript: {
      ignoreBuildErrors: true,
    },
    eslint: {
      ignoreDuringBuilds: true,
    },
  }),
};

module.exports = withPWA(nextConfig);
