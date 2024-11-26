// TODO:
//     Implement "template to HTML" functionality
//     Refactor

const path = require('node:path');

const clearModule = require('clear-module');
const handlebars = require('handlebars');

const { logger } = require('note-down');

const packageJsonPath = path.resolve(__dirname, '..', '..', '..', 'package.json');

class TemplateToHtmlPlugin {
    constructor(options) {
        this.options = options;
    }

    apply(compiler) {
        const _this = this;
        const
            templateFilePath = _this.options.template,
            templateFileName = path.basename(templateFilePath),
            outputHtmlFilename = templateFileName.replace(/\.template$/, '');

        // emit is asynchronous hook, tapping into it using tapAsync, you can use tapPromise/tap(synchronous) as well
        compiler.hooks.emit.tapAsync('TemplateToHtmlPlugin', function (compilation, callback) {
            // Add file to watch
            // https://webpack.js.org/contribute/plugin-patterns/#monitoring-the-watch-graph
            compilation.fileDependencies.add(templateFilePath);

            const templateFileContents = require('node:fs').readFileSync(_this.options.template, 'utf8');

            // TODO: Refactor it
            handlebars.registerHelper('loadAllCssAndJsChunks', function (context, options) { // eslint-disable-line no-unused-vars
                const chunks = context.data.root.chunks;

                let
                    cssCode = '',
                    jsCode = '';
                for (const key of Object.keys(chunks)) {
                    const
                        chunk = chunks[key],
                        filePath = chunk.filePath;
                    if (filePath.match(/\.css$/)) {
                        // Do not load `chunk.` files and let them get loaded in lazy manner
                        if (!filePath.includes('chunk.')) {
                            cssCode += `<link rel="stylesheet" href="${filePath}" />`;
                        }
                    } else if (filePath.match(/\.js$/)) {
                        // Do not load `chunk.` files and let them get loaded in lazy manner
                        if (!filePath.includes('chunk.')) {
                            jsCode += `\n<script src="${filePath}"></script>`;
                        }
                    }
                }

                return cssCode + '\n' + jsCode;
            });

            /*
            // TODO: Remove all the hard codings and hard mappings
            handlebars.registerHelper('loadScript', function (context, options) { // eslint-disable-line no-unused-vars
                const
                    contextHash = context.hash,
                    defaultSrc = contextHash['data-default-src'],
                    defaultType = contextHash['data-default-type'],
                    webpackChunk = contextHash['data-webpack-chunk'];
                return (
                    '<script' +
                        (function () {
                            let str = '';
                            const chunk = context.data.root.chunks[webpackChunk] || {};
                            if (chunk.filePath) {
                                str += ' src="'  + chunk.filePath + '"';
                            } else {
                                if (defaultSrc) {
                                    str += ' src="'  + defaultSrc  + '"';
                                }
                                if (defaultType) {
                                    str += ' type="' + defaultType + '"';
                                }
                            }
                            return str;
                        }()) +
                    '>' +
                    '</script>'
                );
            });

            // TODO: Remove all the hard codings and hard mappings
            handlebars.registerHelper('loadStylesheet', function (context, options) { // eslint-disable-line no-unused-vars
                const
                    contextHash = context.hash,
                    defaultHref = contextHash['data-default-href'],
                    webpackChunk = contextHash['data-webpack-chunk'];
                return (
                    '<link' +
                        ' rel="stylesheet"' +
                        (function () {
                            let str = '';
                            const chunk = context.data.root.chunks[webpackChunk] || {};
                            if (chunk.filePath) {
                                str += ' href="'  + chunk.filePath + '"';
                            } else {
                                if (defaultHref) {
                                    str += ' href="'  + defaultHref  + '"';
                                }
                            }
                            return str;
                        }()) +
                    ' />'
                );
            });
            /* */

            const compiledTemplate = handlebars.compile(templateFileContents);

            const context = structuredClone(_this.options.contextData);
            context.chunks = context.chunks || {};

            let packageJson;
            try {
                clearModule(packageJsonPath);
                packageJson = require(packageJsonPath);
            } catch (e) {
                logger.error('ERROR: Unable to load package.json');
                console.error(e);
                process.exit(1); // eslint-disable-line n/no-process-exit
            }
            context.appVersion = packageJson?.version;

            for (const chunk of compilation.chunks) {
                const chunkFiles = chunk.files;

                const isFileCssOrJs = function (fileName) {
                    if (fileName.endsWith('.css') || fileName.endsWith('.js')) {
                        return true;
                    }
                    return false;
                };

                // There might be multiple files in the chunk (for example: a .css file along with a .js file)
                for (const chunkFileName of chunkFiles) {
                    if (isFileCssOrJs(chunkFileName)) {
                        context.chunks[chunkFileName] = {
                            filePath: chunkFileName,
                            type: (function (chunkFileName) {
                                if (chunkFileName.endsWith('.css')) {
                                    return 'css';
                                } else if (chunkFileName.endsWith('.js')) {
                                    return 'js';
                                }
                            }(chunkFileName))
                        };
                    }
                }
            }

            try {
                const html = compiledTemplate(context);

                // Insert this file into the webpack build as a new file asset:
                compilation.assets[outputHtmlFilename] = {
                    source: function () {
                        return html;
                    },
                    size: function () {
                        return html.length;
                    }
                };

                logger.success(`\nCompiled ${templateFilePath} to ${outputHtmlFilename}`);
            } catch (e) {
                console.log(e);
                logger.error(
                    `\nCould not compile the HTML template:` +
                    `\n    Input: ${templateFilePath}` +
                    `\n    Output: ${outputHtmlFilename}`
                );
            }

            callback();
        });
    }
}

module.exports = TemplateToHtmlPlugin;
