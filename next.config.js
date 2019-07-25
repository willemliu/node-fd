const withOffline = require('next-offline');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.WEBPACK_BUNDLE_ANALYZER === 'true',
});

module.exports = withBundleAnalyzer(
    withOffline({
        generateEtags: process.env.PREVIEW ? true : false,
        target:
            process.env.NOW_SERVERLESS === 'false' ? 'server' : 'serverless',
        pageExtensions: ['jsx', 'js', 'ts', 'tsx'],
        workboxOpts: {
            swDest: 'static/service-worker.js',
            runtimeCaching: [
                {
                    urlPattern: /^https?.*\.png|\.ico|\.jpg|\.gif\??.*$/,
                    handler: 'CacheFirst',
                    options: {
                        cacheName: 'images',
                        cacheableResponse: {
                            statuses: [0, 200],
                        },
                        expiration: {
                            maxEntries: 250,
                            maxAgeSeconds: 30 * 24 * 60 * 60, // 1 month
                        },
                    },
                },
                {
                    urlPattern: /^https?.*\.[a-zA-Z0-9]*\??.*$/,
                    handler: 'NetworkFirst',
                    options: {
                        cacheName: 'https-calls',
                        networkTimeoutSeconds: 15,
                        expiration: {
                            maxEntries: 250,
                            maxAgeSeconds: 30 * 24 * 60 * 60, // 1 month
                        },
                        cacheableResponse: {
                            statuses: [0, 200],
                        },
                    },
                },
            ],
            importScripts: ['/static/sw-push-listener.js'],
        },
        env: {
            BASIC_AUTH: process.env.BASIC_AUTH,
            ENVIRONMENT: process.env.ENVIRONMENT,
            PROXY: process.env.PROXY,
            PREVIEW: process.env.PREVIEW,
        },
        webpack: (config) => {
            // this will output your push listener file to .next folder
            // check CopyWebpackPlugin docs if you want to change the destination (e.g. /static or /.next/static)
            config.plugins.push(
                new CopyWebpackPlugin([
                    {
                        from: 'static/sw-push-listener.js',
                        src: '.next/sw-push-listener.js',
                    },
                ])
            );
            config.node = {
                fs: 'empty',
            };
            // config.resolve.alias['styled-components'] = require.resolve(
            //     'styled-components'
            // );
            return config;
        },
    })
);
