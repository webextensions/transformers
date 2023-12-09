#!/usr/bin/env node

/* eslint-env node */

'use strict';

const
    commander = require('commander'),
    application = require('./application.js');

commander
    .option('-c, --config <config-file>', 'Configuration file to be used (eg: config/config.development.js)')
    .parse(process.argv);

const options = commander.opts();
(async () => {
    await application.start({
        configOptionsFileRootRelativePath: options.config
    });
})();
