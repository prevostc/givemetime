const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');
const fs = require('fs');

const ENV = require('./env');
const PATHS = {
    src: path.join(__dirname, 'src'),
    build: path.join(__dirname, 'build/public'),
};

process.env.BABEL_ENV = ENV;

const common = {
    entry: PATHS.src,
    output: {
        path: PATHS.build,
        filename: 'bundle.js',
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loaders: ['style', 'css?url=false'],
                //include: PATHS.src,
            },
            {
                test: /\.jsx?$/,
                loader: 'babel?cacheDirectory',
                include: PATHS.src,
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.STAGING || 'development')
            },
        }),
    ],
};

// enhance conf with development setup
let conf = common;
if (process.env.STAGING !== 'production') {
    conf = merge(common, {
        devtool: "#inline-source-map",
        devServer: {
            contentBase: PATHS.build,

            // Enable history API fallback so HTML5 History API based
            // routing works. This is a good default that will come
            // in handy in more complicated setups.
            historyApiFallback: {
                index: '/',
                rewrites: [
                    {from: /.*\/bundle\.js.*/, to: '/bundle.js'},
                    {from: /.*/, to: '/'},
                ],
            },
            inline: true,
            progress: true,

            publicPath: '/',

            // Display only errors to reduce the amount of output.
            stats: 'errors-only',

            // Parse host and port from env so this is easy to customize.
            host: process.env.HOST,
            port: process.env.PORT,

            proxy: {
                "/graphql": {
                    "target": {
                        "host": "localhost",
                        "protocol": 'http:',
                        "port": 3000
                    },
                    ignorePath: true,
                    changeOrigin: true,
                    secure: false
                }
            }
        },
    });
}


module.exports = conf;