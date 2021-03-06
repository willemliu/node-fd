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
            ENGINE_API_KEY: process.env.ENGINE_API_KEY,
            ENVIRONMENT: process.env.ENVIRONMENT,
            GENERATE_ETAGS: process.env.GENERATE_ETAGS,
            GRAPHQL_SERVER: process.env.GRAPHQL_SERVER,
            MONGO_DB_PASS: process.env.MONGO_DB_PASS,
            PROXY: process.env.PROXY,
            PREVIEW: process.env.PREVIEW,
        },
        webpack: (config, options) => {
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
            // if (!options.isServer) {
            //     const chunkingDefaults = {
            //         minChunks: 2,
            //         reuseExistingChunk: true,
            //     };
            //     config.optimization.splitChunks.cacheGroups.default = chunkingDefaults;
            //     config.optimization.splitChunks.minChunks = 2;
            // }
            if (!options.isServer) {
                const cacheGroups = config.optimization.splitChunks.cacheGroups;
                delete cacheGroups.react;
                cacheGroups.default = false;
                cacheGroups.vendors = {
                    name: 'vendors',
                    test: /[\\/](node_modules|packages)[\\/]/,
                    enforce: true,
                    priority: 20,
                };
                cacheGroups.commons = {
                    name: 'commons',
                    minChunks: 2,
                    priority: 10,
                };
            }

            return config;
        },
    })
);
