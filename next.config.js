const withOffline = require('next-offline');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.WEBPACK_BUNDLE_ANALYZER === 'true',
});

module.exports = withBundleAnalyzer(
    withOffline({
        generateEtags: process.env.GENERATE_ETAGS === 'true' ? true : false,
        target:
            process.env.NOW_SERVERLESS === 'false' ? 'server' : 'serverless',
        pageExtensions: ['jsx', 'js', 'ts', 'tsx'],
        generateInDevMode: true,
        workboxOpts: {
            cleanupOutdatedCaches: true,
            swDest: 'static/service-worker.js',
            runtimeCaching: [
                {
                    urlPattern: /^https?.*\.png|\.ico|\.jpg|\.gif\??.*$/,
                    handler: 'CacheFirst',
                    options: {
                        cacheName: 'static-files',
                        cacheableResponse: {
                            statuses: [0, 200],
                        },
                        expiration: {
                            maxEntries: 250,
                            maxAgeSeconds: 30 * 24 * 60 * 60, // 1 month
                        },
                    },
                },
                // {
                //     urlPattern: /^https?.*\.[a-zA-Z0-9]*\??.*$/,
                //     handler: 'NetworkFirst',
                //     options: {
                //         cacheName: 'https-calls',
                //         networkTimeoutSeconds: 15,
                //         expiration: {
                //             maxEntries: 250,
                //             maxAgeSeconds: 30 * 24 * 60 * 60, // 1 month
                //         },
                //         cacheableResponse: {
                //             statuses: [0, 200],
                //         },
                //     },
                // },
            ],
            importScripts: ['/static/sw-push-listener.js'],
        },
        env: {
            BASIC_AUTH: process.env.BASIC_AUTH,
            ENVIRONMENT: process.env.ENVIRONMENT,
            GENERATE_ETAGS: process.env.GENERATE_ETAGS,
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
            // config.resolve.alias['etag'] = require.resolve('etag');
            // config.resolve.alias['node-fetch'] = require.resolve('node-fetch');

            const originalEntry = config.entry;
            config.entry = async () => {
                const entries = await originalEntry();

                if (
                    entries['main.js'] &&
                    !entries['main.js'].includes('./utils/polyfills.js')
                ) {
                    entries['main.js'].unshift('./utils/polyfills.js');
                }

                return entries;
            };
            return config;
        },
    })
);
