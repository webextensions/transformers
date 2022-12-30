#!/usr/bin/env node

const path = require('path');
const ghpages = require('gh-pages');

const distDirname = require('../utils/get-distribution-dirname.js');

console.info('Pushing changes to: https://github.com/webextensions/transformers/tree/gh-pages');
ghpages.publish(path.resolve(__dirname, '..', distDirname, 'transformers'), function (err) {
    if (err) {
        console.error('Failed to publish gh-pages at: https://webextensions.github.io/transformers/');
    } else {
        console.info('Published gh-pages at: https://webextensions.github.io/transformers/');
    }
});
