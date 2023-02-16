/* eslint-disable filenames/no-index */

import { configCssFormat } from './configCssFormat.js';
import { configCssMinify } from './configCssMinify.js';

import { configCssToScss } from './configCssToScss.js';

const modeCss = {
    modeId: 'css',
    modeNameForAceEditor: 'css',

    title: 'CSS',

    icon: null,

    hasSyntaxHighlighting: true,

    snippets: [{
        content: [
            'body {',
            '    background-color: #f0f0f0;',
            '}',
            '',
            'body h1 {',
            '    color: #000000;',
            '    font-size: 24px;',
            '    font-weight: bold;',
            '    text-align: center;',
            '}'
        ].join('\n')
    }],

    operations: [
        {
            optgroupLabel: 'Format',
            options: [
                configCssFormat,
                configCssMinify
            ]
        },
        {
            optgroupLabel: 'Convert',
            options: [
                configCssToScss
            ]
        }
    ]
};
modeCss.arrOperations = modeCss.operations.reduce((acc, curr) => {
    return acc.concat(curr.options);
}, []);
modeCss.obOperations = modeCss.arrOperations.reduce((acc, curr) => {
    acc[curr.operationId] = curr;
    return acc;
}, {});

export { modeCss };
