#!/usr/bin/env node

/* eslint-env node */

'use strict';

const { Command } = require('commander');

const application = require('./application.js');

const program = new Command();

program
    .option('-c, --config <config-file>', 'Configuration file to be used (eg: config/config.development.js)')
    .parse();

const options = program.opts();
(async () => {
    await application.start({
        configOptionsFileRootRelativePath: options.config
    });
})();
