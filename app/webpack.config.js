const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const TARGET = process.env.npm_lifecycle_event;

const merge = require('webpack-merge');
const validate = require('webpack-validator');

const parts = require('./lib/parts');

const path = require('path');

process.env.BABEL_ENV = TARGET;

const PATHS = {
    app: path.join(__dirname, 'front-app'),
    dev: path.join(__dirname, 'www'),
    build: path.join(__dirname, 'www'),
    style: [
        path.join(__dirname, 'front-app/style/style.scss'),
    ],
    image: path.join(__dirname, 'front-app/images'),
};

const common = {
    // Entry accepts a path or an object of entries.
    // We'll be using the latter form given it's
    // convenient with more complex configurations.
    entry: {
        style: PATHS.style,
        app: PATHS.app,
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
    },
    output: {
        path: PATHS.dev,
        filename: './js/[name].js',
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader!eslint-loader', // !eslint-loader
            },
            {
                test: /\.(jpg|png)$/,
                loader: 'file?prefix=images/',
                include: PATHS.images,
            },
            {
                test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/font-woff',
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/octet-stream',
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file'
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                include: /font-awesome/,
                loader: 'file'
            },
            {
                test: /\.svg$/,
                loader: 'file?name=images/[name].[ext]',
                include: PATHS.images,
            },
            {
                test : /\.css$/,
                loader: 'style!css'
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: `${__dirname}/front-app/index.html`,
            filename: 'index.html',
            inject: 'body',
            chunks: ['app', 'style'],
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ],
};

var config;

// Detect how npm is run and branch based on that
switch (TARGET) {
    case 'build':
        config = merge(
            common,

            {
                output: {
                    path: PATHS.build,
                    filename: './js/[name].[chunkhash].js',
                    // This is used for require.ensure. The setup
                    // will work without but this is useful to set.
                    chunkFilename: '[chunkhash].js'
                }
            },

            parts.clean(PATHS.build),

            parts.setFreeVariable(
                'process.env.NODE_ENV',
                'production'
            ),

            parts.minify(),

            parts.extractSCSS(PATHS.style),

            parts.purifyCSS([PATHS.app]),

            {
                module: {
                    loaders: [
                        {
                            test: /\.(jpg|png|gif|svg)$/i,
                            loaders: [
                                'file?prefix=images/',
                                'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false',
                            ],
                        },
                    ],
                },
            }

        );
        break;
    default:
        config = merge(
            common,

            {
                devtool: 'eval-source-map',
            },

            // parts.setupJSX(PATHS.app),

            parts.setupSCSS(PATHS.style),

            parts.devServer({
                // Customize host/port here if needed
                host: process.env.HOST,
                port: process.env.PORT,
            })

        );
}

module.exports = validate(config);
