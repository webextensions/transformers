const
    path = require('node:path');

const distDirname = require('../utils/get-distribution-dirname.js');

const
    // webpack = require('webpack'),
    MiniCssExtractPlugin = require('mini-css-extract-plugin'),
    copyWebpackPlugin = require('copy-webpack-plugin');

const
    chalk = require('chalk');

const
    notifyCompletionStatus = require('./utils/notify-completion-status.js');

const
    TemplateToHtmlPlugin = require('./plugins/TemplateToHtmlPlugin/TemplateToHtmlPlugin.js');

const
    projectRoot = path.join(__dirname, '..');

const BABEL_QUERY = {
    presets: [
        // '@babel/preset-env',
        '@babel/preset-react'
    ],
    plugins: [
        // 'transform-es2015-modules-commonjs',
        // '@babel/plugin-syntax-dynamic-import'
    ]
};

const webpackConfigGenerator = function (generatorOptions = {}) {
    const
        {
            verbose,
            watch = false,
            useMinimize,
            useCopyWebpackPlugin,
            publicDirectory,
            // obscuredSourceMaps = false,
            skipEntry = false,
            // useCDNJQuery,
            // useSafeAndSecure,
            // useTrackTime,
            outputJsFilenamePattern = 'bundle.[name].[contenthash:20].js',
            outputJsChunkFilenamePattern = 'chunk.[name].[contenthash:20].js',
            outputCssFilenamePattern = 'bundle.[name].[contenthash:20].css'
        } = generatorOptions;

    const nodeModulesAtProjectRoot = path.resolve(projectRoot, 'node_modules');
    let targetPublicDirectory;
    if (distDirname) {
        targetPublicDirectory = path.join(__dirname, '..', distDirname, 'transformers');
    } else {
        targetPublicDirectory = path.join(projectRoot, publicDirectory);
    }

    // const
    //     templateToHtml = generatorOptions.templateToHtml || {},

    if (verbose) {
        console.log(chalk.blue('Generating webpack configuration for:'));
        console.log(chalk.blue('    ' + JSON.stringify(generatorOptions, null, '    ').replaceAll('\n', '\n    ')));
    }

    const config = {
        watch,

        entry: (function () {
            if (skipEntry) {
                // If we wish for "entry" to be empty, it needs to be a function,
                // otherwise some validations from webpack's end would kick-in and it
                // would error out considering it to be a mistake
                // Reference: https://github.com/webpack/webpack/issues/3123
                return function () {
                    return {};
                };
            } else {
                return {
                    index: [path.join(projectRoot, 'src', 'index.js')]
                    // custom: [path.join(projectRoot, 'src', 'custom.js')]
                    // chunkSafeAndSecure: [ path.join(projectRoot, 'src', '1stparty', 'safe-and-secure', 'safe-and-secure.js') ]
                };
            }
        }()),
        output: {
            path: targetPublicDirectory,
            filename: outputJsFilenamePattern,
            chunkFilename: outputJsChunkFilenamePattern
        },

        // // https://webpack.js.org/configuration/externals/
        // // https://webpack.github.io/docs/library-and-externals.html
        // externals: {
        //     jquery: 'jQuery'
        // },

        // // https://webpack.js.org/configuration/resolve/
        // resolve: {
        //     // https://webpack.js.org/configuration/resolve/#resolvemodules
        //     modules: [
        //         projectRoot + '/' + publicDirectory + '/',
        //         path.join(__dirname, '..', './node_modules')
        //     ]
        // },

        module: {
            rules: [
                // https://github.com/babel/babel-loader#usage
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    options: BABEL_QUERY,
                    // https://github.com/nuxt/nuxt.js/issues/1668#issuecomment-330510870
                    // https://stackoverflow.com/questions/45246365/webpack-2-how-to-exclude-all-node-modules-except-for/45246482#45246482
                    // https://github.com/webpack/webpack/issues/2031#issuecomment-219040479
                    // https://github.com/webpack/webpack/issues/2031#issuecomment-244921229
                    // https://github.com/webpack/webpack/issues/2031#issuecomment-283517150
                    // https://github.com/webpack/webpack/issues/2031#issuecomment-290384493
                    // https://github.com/webpack/webpack/issues/2031#issuecomment-317589620
                    // exclude: /node_modules/
                    exclude: function (modulePath) {
                        if (modulePath.indexOf(nodeModulesAtProjectRoot) === 0) {
                            return true;
                        } else {
                            return false;
                        }

                        // // Do not ignore src/node_modules (useful for cases where node_modules is a custom folder and
                        // // not created via a package manager like npm)
                        // if (/src\/node_modules/.test(modulePath)) {
                        //     return false;
                        // } else if (/node_modules/.test(modulePath)) {
                        //     return true;
                        // } else {
                        //     return false;
                        // }
                    }
                },
                // {
                //     test: /\.(js|jsx)$/,
                //     loader: 'babel-loader?' + JSON.stringify({ presets: ['env']}) + '!eslint-loader',
                //     exclude: /node_modules/
                // },
                {
                    test: /\.css$/,
                    use: [
                        // {
                        //     loader: MiniCssExtractPlugin.loader
                        // },
                        MiniCssExtractPlugin.loader,
                        // 'css-loader',
                        {
                            // https://adamrackis.dev/css-modules/
                            loader: 'css-loader',
                            options: {
                                // https://webpack.js.org/loaders/css-loader/#object-2
                                modules: {
                                    auto: function (resourcePath) {
                                        if (
                                            // TODO: FIXME: Create a separate "vendor.css" or similarly named file
                                            resourcePath.includes('node_modules/')
                                        ) {
                                            return false;
                                        } else {
                                            return true;
                                        }
                                    },
                                    localIdentName: '[name]__[local]--[hash:base64:5]'
                                }
                            }
                        }
                    ]
                }
                // {
                //     test: /\.css$/,
                //     // https://github.com/webpack/style-loader
                //     // https://github.com/webpack/css-loader
                //     loader: 'style-loader!css-loader'
                // },
                // {
                //     test: /\.less$/,
                //     // https://github.com/webpack/style-loader
                //     // https://github.com/webpack/css-loader
                //     // https://github.com/webpack/less-loader
                //     loader: 'style-loader!css-loader!less-loader'
                // },
                // {
                //     test: /\.html$/,
                //     loader: 'html-script-module-loader!html-loader!./index.html',
                //     exclude: /node_modules/
                // }
            ]
        },

        performance: {
            hints: 'warning'
        },

        optimization: {
            minimize: useMinimize,
            noEmitOnErrors: true,
            splitChunks: {
                // TODO: Adjust minSize and maxSize to more practical values
                minSize: 50000,
                maxSize: 2000000,

                automaticNameDelimiter: '.',

                // https://webpack.js.org/plugins/split-chunks-plugin/#optimizationsplitchunks
                // chunks: 'all',
                cacheGroups: {
                    commons: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors', // https://webpack.js.org/plugins/split-chunks-plugin/#splitchunksname
                        chunks: 'initial'
                    },
                    lessNpmPackage: {
                        test: /[\\/]node_modules[\\/]less[\\/]/,
                        name: 'lessNpmPackage',
                        chunks: 'async'
                    }
                }
            },
            // The runtime should be in its own chunk
            runtimeChunk: {
                // name: 'runtime'
            }
        },

        devtool: 'source-map',

        plugins: (function () {
            const plugins = [];

            // plugins.push(new webpack.SourceMapDevToolPlugin({
            //     exclude: [
            //         /3rdparty/,
            //         /node_modules/
            //     ],
            //     filename: (function () {
            //         let filename = '';
            //         if (obscuredSourceMaps) {
            //             filename = '[file].' + obscuredSourceMaps + '.map';
            //         } else {
            //             filename = '[file].map';
            //         }
            //         return filename;
            //     }()),
            //     // https://webpack.js.org/plugins/source-map-dev-tool-plugin/#options
            //     // https://github.com/webpack/webpack/issues/1609#issuecomment-156747371
            //     //     - Only "false" or "undefined" can be used as a value for append
            //     append: obscuredSourceMaps ? false : undefined
            // }));

            plugins.push(new MiniCssExtractPlugin({
                filename: outputCssFilenamePattern
            }));

            if (useCopyWebpackPlugin) {
                plugins.push(
                    new copyWebpackPlugin(
                        {
                            patterns: (function () {
                                const arr = [
                                    {
                                        from: path.join(projectRoot, 'src', 'favicon.ico'),
                                        to: targetPublicDirectory
                                    },
                                    {
                                        from: path.join(projectRoot, 'src', 'favicon.ico.source.txt'),
                                        to: targetPublicDirectory
                                    }
                                ];
                                return arr;
                            }())
                        },
                        {
                            copyUnmodified: false
                        }
                    )
                );
            }

            plugins.push(new TemplateToHtmlPlugin({
                template: path.join(projectRoot, 'src', 'index.html.template'),
                entry: {
                    // chunkSafeAndSecure: entry.chunkSafeAndSecure
                },
                contextData: {
                    // useCDNJQuery,
                    // useSafeAndSecure,
                    // useTrackTime
                }
            }));

            // https://webpack.js.org/api/compiler-hooks/#hooks
            // https://github.com/kossnocorp/on-build-webpack/issues/5#issuecomment-432192978
            // https://stackoverflow.com/questions/30312715/run-command-after-webpack-build/49786887#49786887
            plugins.push({
                apply: (compiler) => {
                    compiler.hooks.done.tap('done', (stats) => {
                        notifyCompletionStatus(stats);
                    });
                }
            });

            return plugins;
        }()),

        // https://webpack.js.org/configuration/stats/
        stats: {
            errorDetails: true,
            // https://github.com/webpack-contrib/mini-css-extract-plugin/issues/271#issuecomment-449694009
            children: false
        }
    };

    if (verbose) {
        console.log(chalk.blue('Generated webpack configuration:'));
        console.log(chalk.blue('    ' + JSON.stringify(config, null, '    ').replaceAll('\n', '\n    ')));
    }

    return config;
};

module.exports = webpackConfigGenerator;
