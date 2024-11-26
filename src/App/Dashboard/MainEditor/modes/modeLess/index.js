import { configLessFormat } from './configLessFormat.js';

import { configLessToCss } from './configLessToCss.js';

const modeLess = {
    modeId: 'less',
    modeNameForAceEditor: 'less',

    title: 'LESS',

    icon: null,

    hasSyntaxHighlighting: true,

    snippets: [{
        content: [
            '@color: #444;',
            '',
            'body {',
            '    color: @color;',
            '',
            '    a {',
            '        color: @color;',
            '    }',
            '}'
        ].join('\n')
    }],

    operations: [
        {
            optgroupLabel: 'Format',
            options: [
                configLessFormat
            ]
        },
        {
            optgroupLabel: 'Convert',
            options: [
                configLessToCss
            ]
        }
    ]
};
// eslint-disable-next-line unicorn/no-array-reduce
modeLess.arrOperations = modeLess.operations.reduce((acc, curr) => {
    return acc.concat(curr.options);
}, []);
// eslint-disable-next-line unicorn/no-array-reduce
modeLess.obOperations = modeLess.arrOperations.reduce((acc, curr) => {
    acc[curr.operationId] = curr;
    return acc;
}, {});

export { modeLess };
