import { configHtmlFormat } from './configHtmlFormat.js';

const modeHtml = {
    modeId: 'html',
    modeNameForAceEditor: 'html',

    title: 'HTML',

    icon: null,

    hasSyntaxHighlighting: true,

    snippets: [{
        content: [
            '<!DOCTYPE html>',
            '<html>',
            '  <head>',
            '    <title>My Website</title>',
            '  </head>',
            '  <body>',
            '    <h1>Welcome to my website</h1>',
            '    <p>This is a paragraph of text.</p>',
            '  </body>',
            '</html>'
        ].join('\n')
    }],

    operations: [
        {
            optgroupLabel: 'Format',
            options: [
                configHtmlFormat
            ]
        }
    ]
};
// eslint-disable-next-line unicorn/no-array-reduce
modeHtml.arrOperations = modeHtml.operations.reduce((acc, curr) => {
    return acc.concat(curr.options);
}, []);
// eslint-disable-next-line unicorn/no-array-reduce
modeHtml.obOperations = modeHtml.arrOperations.reduce((acc, curr) => {
    acc[curr.operationId] = curr;
    return acc;
}, {});

export { modeHtml };
