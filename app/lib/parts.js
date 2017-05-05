const webpack = require('webpack');

const CleanWebpackPlugin = require('clean-webpack-plugin');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const PurifyCSSPlugin = require('purifycss-webpack-plugin');


exports.clean = function (path) {
    return {
        plugins: [
            new CleanWebpackPlugin([path], {
                // Without `root` CleanWebpackPlugin won't point to our
                // project and will fail to work.
                root: process.cwd(),
            }),
        ],
    };
};

exports.purifyCSS = function (paths) {
    return {
        plugins: [
            new PurifyCSSPlugin({
                basePath: process.cwd(),
                paths: paths
            }),
        ]
    }
}


exports.extractSCSS = function(paths) {
    return {
        module: {
            loaders: [
                // Extract SCSS during build
                {
                    test: /\.scss$/,
                    loader: ExtractTextPlugin.extract('style', 'css!sass'),
                    include: paths
                }
            ]
        },
        plugins: [
            // Output extracted SCSS to a file
            new ExtractTextPlugin('./css/[name].[chunkhash].css')
        ]
    };
};


exports.devServer = function (options) {
    return {
        devServer: {
            // Enable history API fallback so HTML5 History API based
            // routing works. This is a good default that will come
            // in handy in more complicated setups.
            historyApiFallback: true,

            // Unlike the cli flag, this doesn't set
            // HotModuleReplacementPlugin!
            hot: true,
            inline: true,
            // progress: true,

            // Display only errors to reduce the amount of output.
            stats: 'errors-only',

            // Parse host and port from env to allow customization.
            //
            // If you use Vagrant or Cloud9, set
            // host: options.host || '0.0.0.0';
            //
            // 0.0.0.0 is available to all network devices
            // unlike default localhost
            host: options.host,
            port: options.port,
        },
        plugins: [
            // Enable multi-pass compilation for enhanced performance
            // in larger projects. Good default.
            new webpack.HotModuleReplacementPlugin({
                multiStep: true,
            }),
        ],
    };
};

exports.setupSCSS = function (paths) {
    return {
        module: {
            loaders: [
                {
                    test: /\.scss$/,
                    loaders: ['style', 'css', 'sass'],
                    include: paths,
                },
            ],
        },
    };
};

exports.minify = function () {
    return {
        plugins: [
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false,
                    drop_console: true,
                },
            }),
        ],
    };
};

exports.setFreeVariable = function (key, value) {
    const env = {};
    env[key] = JSON.stringify(value);

    return {
        plugins: [
            new webpack.DefinePlugin(env),
        ],
    };
};

exports.extractBundle = function (options) {
    const entry = {};
    entry[options.name] = options.entries;

    return {
        // Define an entry point needed for splitting.
        entry,
        plugins: [
            // Extract bundle and manifest files. Manifest is
            // needed for reliable caching.
            new webpack.optimize.CommonsChunkPlugin({
                names: [options.name, 'manifest'],

                // options.name modules only
                minChunks: Infinity,
            }),
        ],
    };
}
